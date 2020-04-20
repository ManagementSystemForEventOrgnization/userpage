
import React, { Component } from 'react'

export default class Trash extends Component {
  render() {
    return (
      <div key={this.props.key}>
        {this.props.name}
      </div>
    )
  }
}
