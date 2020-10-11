module.exports = {
	extension: ['js'],
	reporter: 'mochawesome',
	require: [
		'@babel/register',
		'jsdom-global/register',
		'./_mocha_/helpers.js',
		'./_mocha_/dom.js'
	],
	ui: 'bdd'
}
