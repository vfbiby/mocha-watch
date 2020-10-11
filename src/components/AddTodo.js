import React, {createRef} from 'react';

class AddTodo extends React.Component{
  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.textInput = createRef()
  }

  handleSubmit(event){
    this.props.onSubmit(this.textInput.current.value)
    this.textInput.current.value = ''
    event.preventDefault()
  }

  render(){    
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref={this.textInput} name="todo" type="text"/>
        <input type="submit" value="Add Todo"/>
      </form>
    )
  }
}

export default AddTodo
