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

function combineJestAndChaiExpect() {
  // Make sure chai and jest ".not" play nice together
  const originalNot = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, 'not').get;
  Object.defineProperty(chai.Assertion.prototype, 'not', {
    get() {
      Object.assign(this, this.assignedNot);
      return originalNot.apply(this);
    },
    set(newNot) {
      this.assignedNot = newNot;
      return newNot;
    },
  });

  // Combine both jest and chai matchers on expect
  global.expect = (actual) => {
    const originalMatchers = jestExpect(actual);
    const chaiMatchers = chai.expect(actual);
    const combinedMatchers = Object.assign(chaiMatchers, originalMatchers);
    return combinedMatchers;
  };
}
combineJestAndChaiExpect()

global.sinon = sinon

global.mount = mount
global.render = render
global.shallow = shallow
