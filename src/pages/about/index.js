import React, { Component } from 'react'
import {Skeleton} from 'antd'
import { Rate } from 'antd';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export default class index extends Component {
  state={
    value:3
  }

  handleChange = (value)=>{
    this.setState({
      value
    })
  }
  render() {
    const {value} = this.state

    return (
      <div>
       <Skeleton active></Skeleton>
       <span>
        <Rate tooltips={desc} onChange={this.handleChange} value={value} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
      </span>
      </div>
    )
  }
}
