import React, { Component } from 'react';
import { Skeleton } from 'antd';
import { Rate } from 'antd';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

function Welcome(props) {
  // console.log(props);
  return <h1>hello,{props.name}</h1>;
}

function ActionLink(props) {
  function handleClick(e) {
    e.preventDefault();
    const data = [1, 2, 3];
    props.handleClickqq(data);
  }

  return (
    <a href="http://www.jd.com" onClick={handleClick}>
      Click me
    </a>
  );
}

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      date: new Date().toLocaleTimeString(),
    };
    // 为了在回调中使用 `this`，这个绑定是必不可少的,或者用箭头函数就不用写这个绑定this
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      value,
    });
  }

  tick() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date}.</h2>
      </div>
    );
  }

  // 接受子组件的data值
  handleClickle(data) {
    console.log(data, '---');
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date().toLocaleTimeString(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { value } = this.state;

    return (
      <div>
        <Skeleton active />
        <Welcome name="reactApp" />
        <Welcome name="feiyu" />
        <span>
          <Rate tooltips={desc} onChange={this.handleChange} value={value} />
          {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
        </span>
        {this.tick()}
        {/* handleClickqq就是props传给子组件的key值 */}
        <ActionLink handleClickqq={this.handleClickle} />
      </div>
    );
  }
}
