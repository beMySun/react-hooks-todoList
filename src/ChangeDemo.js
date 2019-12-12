import React, { Component } from 'react'
import { debounce } from 'lodash';

export default class ChangeDemo extends Component {
  state = {
    text: ''
  }

  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args)
    return e => {
      e.persist();
      return this.debouncedEvent(e)
    }
  }

  handleChange = e => {
    console.log('update form and sent Axios')
    this.setState({
      text: e.target.value
    })
  }  

  render() {
    return (
      <div>
        <input onChange={this.debounceEvent(this.handleChange, 300)}/>
        <p>
          { this.state.text}
        </p>
      </div>
    )
  }
}
