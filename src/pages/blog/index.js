import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Table, Spin, Button, BackTop, Icon, message } from 'antd';
import axios from '@/libs/axios';
import CodeBlock from './CodeBlock';
import scrollTo from '@/libs/scrollTo';
import styles from './index.scss';
export default class Blog extends Component {
  state = {
    data: [],
    markDownData: '',
  };

  async getBlogList() {
    const res = await axios({
      url: 'repos/chanshiyucx/blog/issues',
      method: 'get',
      params: {
        page: 1,
        per_page: 100, // 上限是 100
      },
    });

    // console.log(res);

    if (res.status !== 200) {
      message.warning(res.statusText, 2);
      return;
    }
    res.data.forEach(element => {
      element.key = element.id;
    });
    this.setState({
      data: res.data,
      markDownData: res.data[0].body,
    });
  }

  // 查看
  handleClick(item) {
    //console.log(item.body);
    this.setState({
      markDownData: item.body,
    });
    scrollTo(765, 500, function() {
      console.log('500毫秒返回指定高度');
    });
  }

  componentDidMount() {
    this.getBlogList();
  }

  render() {
    const columns = [
      {
        title: '创建时间',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '更新时间',
        dataIndex: 'updated_at',
        key: 'updated_at',
      },
      {
        title: '文章链接',
        dataIndex: 'html_url',
        key: 'html_url',
        render: text => {
          return (
            <a href={text} target={'_blank'}>
              {text}
            </a>
          );
        },
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <Button type="primary" onClick={this.handleClick.bind(this, record)}>
              查看
            </Button>
          );
        },
      },
    ];
    const { data, markDownData } = this.state;
    return (
      <div className={styles.box}>
        {data.length === 0 ? <Spin size="large" /> : <Table columns={columns} dataSource={data} />}

        <ReactMarkdown
          source={markDownData}
          className={styles.markdown}
          renderers={{ code: CodeBlock }}
        />
        <BackTop>
          <Icon type="rocket" style={{ fontSize: '45px', color: '#ea8b98' }} />
        </BackTop>
      </div>
    );
  }
}
