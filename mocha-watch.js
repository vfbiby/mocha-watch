const net = require('net')
const path = require('path')
const yargs = require('yargs')
const watch = require('node-watch')
const dependencyTree = require('dependency-tree')
const getPort = require('get-port')
const glob = require('glob')
const fs = require('fs')
const Mocha = require('mocha')

let watchFile = true
let watchSocket = true

function parseArgs() {
	const argv = yargs
		.command('file', 'Run mocha tests when file changes')
		.command('socket', 'Run mocha tests when receiving commands from socket')
		.help()
		.alias('help', 'h').argv
	// console.log(argv)
	return argv
}

const argv = parseArgs()
if (argv._.length > 0) {
	watchFile = false
	watchSocket = false
	if (argv._.includes('file')) {
		watchFile = true
	}
	if (argv._.includes('socket')) {
		watchSocket = true
	}
}

function createMocha() {
	const newMocha = new Mocha()
	const preloadFiles = [
		'node_modules/@babel/register',
		'node_modules/jsdom-global/register',
		'_mocha_/helpers.js',
		'_mocha_/dom.js'
	]
	newMocha.files = preloadFiles
	return newMocha
}

function mochaRun(prepareTests) {
	const newMocha = createMocha()
	prepareTests(newMocha)
	return new Promise((resolve) => {
		newMocha.run((failures) => {
			console.debug(`Failed count: ${failures}`)
			resolve()
		})
	})
		.catch((error) => {
			console.error(error)
		})
		.then(unloadFiles)
		.then(scan)
		.then(() => {
			newMocha._previousRunner && newMocha._previousRunner.dispose()
		})
}

let changedFiles = []
let timeout = null
let trees = {}

const testFilesGlob = './{src,__tests__,_mocha_}/**/*.{spec,test}.js'
const testFileExtensions = ['.spec.js', '.test.js']

const watchDirs = ['./src', './__tests__']
const watchFileFilter = /\.js/

function buildDependencyTree(filename) {
	return dependencyTree({
		filename,
		isListForm: true,
		directory: './src',
		filter: (path) => path.indexOf('node_modules') === -1
	})
}

function scan() {
	return new Promise((resolve) => {
		glob(testFilesGlob, {}, function (err, files) {
			// console.log(files)
			trees = {}
			for (let file of files) {
				trees[file.replace('./', '')] = buildDependencyTree(file)
			}
			// console.log(trees)
			resolve()
		})
	})
}

function clearConsole() {
	// 1. Print empty lines until the screen is blank.
	process.stdout.write('\x1b[2J')
	// 2. Clear the scrollback.
	process.stdout.write('\u001b[H\u001b[2J\u001b[3J')
}

function unloadFile(file) {
	delete require.cache[file]
}

function unloadFiles() {
	for (const key of Object.keys(trees)) {
		unloadFile(path.join(__dirname, key))
		const deps = trees[key]
		for (const dep of deps) {
			unloadFile(dep)
		}
	}
}

function startWatchFile() {
	watch(watchDirs, { recursive: true, filter: watchFileFilter }, function (
		evt,
		name
	) {
		changedFiles.push(name)

		if (timeout) {
			clearTimeout(timeout)
		}
		timeout = setTimeout(() => {
			try {
				// build test list
				let tests = []
				for (let file of changedFiles) {
					if (testFileExtensions.some((ext) => file.indexOf(ext) >= 0)) {
						tests.push(file)
					} else {
						// find it in dependency tree
						for (let f of Object.getOwnPropertyNames(trees)) {
							if (trees[f].some((n) => n.indexOf(file) >= 0)) {
								tests.push(f)
							}
						}
					}
				}

				changedFiles = []

				if (tests.length) {
					clearConsole()
					console.debug(`Running tests in ${tests.length} changed files`)
					mochaRun((mocha) => {
						for (const test of tests) {
							mocha.addFile(test)
						}
					})
				}
			} catch (ex) {
				console.error(ex)
			} finally {
				scan()
			}
		}, 100)
	})
}

async function startNetServer() {
	const port = await getPort({ port: getPort.makeRange(40123, 40200) })
	const server = net.createServer()

	server.on('connection', (socket) => {
		// socket.write('HELLO')
		socket.on('data', (d) => {
			socket.write('OK')
			clearConsole()
			const input = d.toString()
			console.debug(input)
			let cmd
			try {
				cmd = JSON.parse(input)
			} catch (error) {
				console.error(error)
				return
			}
			const { type } = cmd
			switch (type) {
				case 'file': {
					const { file, title } = cmd
					if (title) {
						console.log(`Running tests in file "${file}" that match "${title}"`)
						mochaRun((mocha) => {
							mocha.addFile(file)
							mocha.grep(title)
						})
					} else {
						console.log(`Running all tests in file "${file}"`)
						mochaRun((mocha) => {
							mocha.addFile(file)
						})
					}
					break
				}

				case 'allfile': {
					console.log(`Running all tests`)
					mochaRun((mocha) => {
						Object.keys(trees).forEach((test) => mocha.addFile(test))
					})
					break
				}

				default:
					console.error(`Unknown type: ${type}`)
					break
			}
		})

		socket.on('error', (error) => {
			console.error(error)
		})
	})

	server.on('error', (error) => {
		console.log(`Failed to start the mocha-watch.js server`)
		console.error(error)
	})

	server.listen(port, () => {
		console.log(`mocha-watch.js is listening on port: ${port}`)
		fs.writeFile(
			path.join(__dirname, '.mochaserverrc.js'),
			`{"port": ${port}}`,
			(err) => {
				if (err) {
					console.error(err)
				}
			}
		)
	})
}

if (!watchFile && !watchSocket) {
	console.log('You are not watching anything!')
	return
}

// scan is always needed
scan()
	.then(() => {
		try {
			const mocha = createMocha()
			Object.keys(trees).forEach((test) => mocha.addFile(test))
			mocha.loadFiles()
		} catch (error) {
			console.error(error)
		} finally {
			unloadFiles()
		}
	})
	.then(() => {
		if (watchFile) {
			console.log(`Watching file changes...`)
			startWatchFile()
		}

		if (watchSocket) {
			console.log(`Watching socket commands (describe/it title or regex)...`)
			startNetServer()
		}
	})
