function hello(name, cb){
  cb('hello ' + name)
}

describe('sinon test', function() {
  it("can mock a function call", function(){
    let testFunc = sinon.fake.returns('apple pie')

    expect(testFunc()).to.equal('apple pie')
    expect(testFunc.callCount).to.equal(1)
  })

  it("should call callback with correct greeting", function(){
    let cb = sinon.spy()

    hello('james', cb)

    expect(cb).to.have.been.calledWith('hello james')
    expect(cb).to.have.been.callCount(1)
  })
});
