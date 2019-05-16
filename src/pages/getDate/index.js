import React, { Component } from 'react';
import axios from '@/libs/axios';
import { Table } from 'antd';

export default class GetData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
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

        res.data.forEach(element => {
          element.key = element.id;
        });
        this.setState({
          dataSource: res.data,
        });
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
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'name',
      },
      {
        title: '文件大小',
        dataIndex: 'size',
        render: (text, record, index) => {
          return <span>{text}KB</span>;
        },
      },
      {
        title: '项目描述',
        dataIndex: 'description',
      },
      {
        title: '地址',
        dataIndex: 'url',
      },
    ];

    return (
      <div>
        <Table columns={columns} dataSource={this.state.dataSource} />
      </div>
    );
  }
}
