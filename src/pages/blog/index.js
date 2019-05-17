import React, { Component } from 'react';
import { Table } from 'antd';
import { get } from '@/libs/axios';

export default class Blog extends Component {
  state = {};

  async getBlogList() {
    const res = await get('repos/feiyuWeb/Blog/notes');
    console.log(res);
  }

  componentDidMount() {
    this.getBlogList();
  }
  render() {
    return (
      <div>
        <Table />
      </div>
    );
  }
}
