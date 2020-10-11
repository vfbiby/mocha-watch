import { JSDOM } from 'jsdom'
import sinon from 'sinon'

const { window } = new JSDOM()

function copyProps(src, target) {
	const props = Object.getOwnPropertyNames(src)
		.filter((prop) => typeof target[prop] === 'undefined')
		.reduce(
			(result, prop) => ({
				...result,
				[prop]: Object.getOwnPropertyDescriptor(src, prop)
			}),
			{}
		)
	Object.defineProperties(target, props)
}

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: (query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: sinon.spy(), // deprecated
		removeListener: sinon.spy(), // deprecated
		addEventListener: sinon.spy(),
		removeEventListener: sinon.spy(),
		dispatchEvent: sinon.spy()
	})
})

if (typeof window.URL.createObjectURL === 'undefined') {
	Object.defineProperty(window.URL, 'createObjectURL', { value: () => {} })
}

global.URL = window.URL
global.window = window
global.document = window.document
global.navigator = {
	userAgent: 'node.js',
	platform: 'mac'
}

copyProps(window, global)
