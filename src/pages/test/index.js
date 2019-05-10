import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import router from 'umi/router';
import Welcome from '@/components/Welcome';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <i>{text}</i>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <i>Invite {record.name}</i>
        <Divider type="vertical" />
        <i>Delete</i>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function NumberList(props) {
  const style = {
    display: 'flex',
    justifyContent: 'center',
  };
  const numbers = props.numbers;
  const listItems = numbers.map(number => <li key={number.toString()}>{number}</li>);
  //console.log(listItems);
  return <ul style={{ ...style }}>{listItems}</ul>;
}

export default class index extends Component {
  jumpUrl() {
    router.push({ pathname: '/about' });
  }

  render() {
    const numbers = [1, 3, 5, 8, 9];
    return (
      <div>
        <Table columns={columns} dataSource={data} />
        <button onClick={this.jumpUrl.bind(this)}>页面跳转</button>
        <NumberList numbers={numbers} />
        <Welcome color="pink" isShow={true} />
        <Welcome color="blue" isShow={false} />
      </div>
    );
  }
}
