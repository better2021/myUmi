import React, { Component } from 'react';
import axios from '@/libs/axios';

export default class GetData extends Component {
  constructor(props) {
    super(props);
    this.state = [];
  }

  getData() {
    axios({
      url: '/users/feiyuWeb/repos',
      method: 'GET',
    })
      .then(res => {
        if (res.status !== 200) {
          console.log(res.statusText);
          return;
        }
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getData();
  }
  render() {
    return <div />;
  }
}
