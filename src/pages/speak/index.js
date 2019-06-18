import React, { Component } from 'react';
import { Input, Button, message } from 'antd';

const { TextArea } = Input;
export default class speak extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

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

  // 阅读
  handleRead() {
    // console.log(this.state.value);
    const { value } = this.state;
    if (!value.trim()) {
      return message.warning('输入框不能为空哦', 1.5);
    }
    this.speak(value);
  }

  // 视频
  handleVideo() {
    // console.log(this.myRef.current);
    let video = this.myRef.current;
    // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
    // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function(constraints) {
        // 首先，如果有getUserMedia的话，就获得它
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        // 否则，为老的navigator.getUserMedia方法包裹一个Promise
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(function(stream) {
        // 旧的浏览器可能没有srcObject
        if ('srcObject' in video) {
          video.srcObject = stream;
        } else {
          // 防止在新的浏览器里使用它，应为它已经不再支持了
          video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) {
        console.log(err.name + ': ' + err.message);
      });
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
          rows={8}
          value={this.state.value}
          onChange={e => this.handleChange(e)}
          placeholder="请输入要朗读的文字"
        />
        <Button type="primary" style={{ marginTop: '20px' }} onClick={this.handleRead.bind(this)}>
          朗读文字
        </Button>
        <div style={{ marginTop: '20px' }}>
          <div>
            <video src="" width="480" height="320" controls autoPlay ref={this.myRef} />
          </div>
          <Button
            type="primary"
            style={{ marginTop: '20px' }}
            onClick={this.handleVideo.bind(this)}
          >
            视频
          </Button>
        </div>
      </div>
    );
  }
}
