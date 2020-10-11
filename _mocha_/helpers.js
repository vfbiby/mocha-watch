import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import mockCssModules from 'mock-css-modules'
import Adapter from 'enzyme-adapter-react-16'
import { mount, render, shallow, configure } from 'enzyme'

chai.use(sinonChai)

configure({ adapter: new Adapter() })

mockCssModules.register(['.less'])

global.sinon = sinon
global.expect = chai.expect

global.mount = mount
global.render = render
global.shallow = shallow
