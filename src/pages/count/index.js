import React, { PureComponent } from 'react';
import { Input } from 'antd';

// import {useState, useEffect } from 'react

class SetTime extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 10,
      delay: 1000,
    };
  }

  onChange = e => {
    const delay = parseInt(e.target.value);
    if (!delay) {
      clearInterval(this.timer);
      return;
    }
    this.setState({
      delay,
    });
  };

  tick() {
    this.timer = setInterval(() => {
      this.setState(state => ({
        count: state.count + 1,
      }));
    }, this.state.delay);
  }

  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  // componentDidUpdate生命周期可以接受两个参数prevProps, prevState,上一个状态的props和state
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, prevState);
    if (prevState.delay !== this.state.delay) {
      clearInterval(this.timer);
      this.tick();
    }
  }

  render() {
    return (
      <div>
        <p>输入数字看看哦</p>
        <Input placeholder="Basic usage" style={{ width: '300px' }} onChange={this.onChange} />
        <p style={{ fontSize: '36px', color: 'pink' }}>{this.state.count}</p>
      </div>
    );
  }
}

export default SetTime;

/**
 * hook 实现以上的输入自定义定时功能的代码更精简
 */

// export default function Hello() {
//   const [count, setCount] = useState(0);
//   const [delay, setDelay] = useState(1000);
//   useEffect(
//     () => {
//       const timer = setInterval(() => setCount(c => c + 1), delay);
//       return () => clearInterval(timer);
//     },
//     [delay],
//   );

//   const tick = e => setDelay(+e.target.value);

//   return (
//     <div>
//       <Input placeholder="Basic usage" style={{ width: '300px' }} onChange={tick} />
//       <p>{count}</p>
//     </div>
//   );
// }
