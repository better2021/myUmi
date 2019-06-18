import React, { Component } from 'react';
import { Input, Button, message } from 'antd';

const { TextArea } = Input;
export default class speak extends Component {
  state = {
    value: '',
  };

  speak(txt) {
    let speech = new SpeechSynthesisUtterance();
    // console.log(speech);
    //设置朗读内容和属性
    speech.text = txt; // 阅读内容
    speech.volume = 1; // 表示音量值的浮点数，介于0（最低）和1（最高）之间
    speech.rate = 1; // 语速，它可以在0.1（最低）和10（最高）之间，2是两倍快，0.5是快一半等
    speech.pitch = 1; // 表示音高值的浮点数。它可以在0（最低）和2（最高）之间
    window.speechSynthesis.speak(speech);
  }

  handleRead() {
    // console.log(this.state.value);
    const { value } = this.state;
    if (!value.trim()) {
      return message.warning('输入框不能为空哦', 1.5);
    }
    this.speak(value);
  }

  handleChange(e) {
    // console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <h2>文字转化为语言，读出来，试试哦</h2>
        <TextArea
          rows={6}
          value={this.state.value}
          onChange={e => this.handleChange(e)}
          placeholder="请输入要朗读的文字"
        />
        <Button type="primary" style={{ marginTop: '20px' }} onClick={this.handleRead.bind(this)}>
          朗读文字
        </Button>
        <div />
      </div>
    );
  }
}
