import React from 'react';
import Link from './Link';


describe('Link Spec', () => {
  it("should have no anchor when it is active", function(){
    const wrapper = shallow(<Link active={true}>All</Link>)

    expect(wrapper.findWhere(n => n.text() == 'All').parent().type()).to.equal('span')
  })

  it("should render a anchor when it is unactive", function(){
    const wrapper = shallow(<Link active={false}>All</Link>)

    expect(wrapper.findWhere(n => n.text() == 'All').parent().type()).to.equal('a')
    expect(wrapper.findWhere(n => n.text() == 'All').parent().prop('href')).to.equal('')
  })

  it("should call a function when a link was clicked", function(){
    const onLinkClick = sinon.spy()

    const wrapper = shallow(<Link active={false} onClick={ ()=>{onLinkClick()} }>Active</Link>)

    wrapper.findWhere(n => n.text() == 'Active').parent().simulate('click', { preventDefault: () => {} })
    expect(onLinkClick).to.have.been.callCount(1)
  })
});
