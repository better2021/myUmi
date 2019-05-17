import React, { Component } from 'react';
import axios from '@/libs/axios';
import { Table, Skeleton, Button } from 'antd';
export default class GetData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      list: [{ name: '飞鱼', val: 'feiyuWeb' }, { name: '蝉时雨', val: 'chanshiyucx' }],
    };
  }

  getData(val = 'feiyuWeb') {
    axios({
      url: `/users/${val}/repos`,
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

  handleSwitch(item, e) {
    console.log(item);
    this.getData(item.val);
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
        title: '创建时间',
        dataIndex: 'created_at',
        render: text => {
          return <span>{text.substring(0, 10)}</span>;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'pushed_at',
        render: text => {
          return <span>{text.substring(0, 10)}</span>;
        },
      },
      {
        title: '地址',
        dataIndex: 'html_url',
        render: text => {
          return (
            <a href={text} target={'_blank'}>
              {text}
            </a>
          );
        },
      },
    ];

    const { dataSource, list } = this.state;
    return (
      <div style={{ padding: '20px' }}>
        <div>
          {list.map(item => {
            return (
              <Button
                type="primary"
                key={item.name}
                style={{ margin: '10px 5px' }}
                onClick={e => {
                  this.handleSwitch(item, e);
                }}
              >
                {item.name}
              </Button>
            );
          })}
        </div>
        {dataSource.length === 0 ? (
          <Skeleton active />
        ) : (
          <Table columns={columns} dataSource={dataSource} />
        )}
      </div>
    );
  }
}
