import chai from 'chai'
import jestExpect from 'expect'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import mockCssModules from 'mock-css-modules'
import Adapter from 'enzyme-adapter-react-16'
import { mount, render, shallow, configure } from 'enzyme'
import * as matchers from '@testing-library/jest-dom'

configure({ adapter: new Adapter() })

mockCssModules.register(['.less'])

chai.use(sinonChai)
jestExpect.extend(matchers)

global.expect = function expect(params) {
  const _chaiExpect = chai.expect(params)
  const _jestExpect = jestExpect(params)
  return new Proxy(_chaiExpect, {
    get: function (target, prop, receiver) {
      try {
        return _chaiExpect[prop]
      } catch (error) {
        return _jestExpect[prop]
      }
    }
  })
}

global.sinon = sinon

global.mount = mount
global.render = render
global.shallow = shallow
