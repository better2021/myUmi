import React, { Component } from 'react';
import axios from '@/libs/axios';

import { Button, Radio, Table, message } from 'antd';
import ModalBox from './modal';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.handleMenu = this.handleMenu.bind(this);
  }
  state = {
    curMenuId: 0,
    visible: false,
    confirmLoading: false,
    menuList: [],
    productList: [],
    editObj: {},
  };

  // 获取菜单列表
  async getMenuList() {
    try {
      const res = await axios({
        url: 'http://127.0.0.1/api/menu',
        method: 'get',
      });
      if (res.status !== 200) {
        message.warning(res.message, 2);
        return;
      }
      //  console.log(res.data.data, 'menu');
      const curMenuId = this.state.curMenuId;

      this.setState({
        menuList: res.data.data,
        curMenuId: curMenuId || (res.data.data.length ? res.data.data[0].id : 1),
      });
    } catch (err) {
      console.log(err);
    }
  }

  // 獲取产品列表
  async getProductList() {
    try {
      const res = await axios({
        url: 'http://127.0.0.1/api/product',
        method: 'get',
        params: {
          menuId: this.state.curMenuId,
        },
      });

      if (res.status !== 200) {
        message.warning(res.message, 2);
        return;
      }
      // console.log(res, '--');
      res.data.data.forEach(element => {
        element.key = element.id;
      });
      this.setState({
        productList: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // 新增产品
  async addProduct(data) {
    try {
      const res = await axios({
        url: 'http://127.0.0.1/api/product',
        method: 'post',
        data,
      });
      if (res.status !== 200) {
        message.warning(res.message, 2);
        return;
      }
      this.getProductList();
    } catch (err) {
      console.log(err);
    }
  }

  // 编辑产品
  async editProduct(data) {
    try {
      const res = await axios({
        url: `http://127.0.0.1/api/product/${data.id}`,
        method: 'put',
        data,
      });
      if (res.status !== 200) {
        message.warning(res.message, 2);
        return;
      }
      this.getProductList();
    } catch (err) {
      console.log(err);
    }
  }

  // 删除接口
  async deleteProduct(id) {
    try {
      const res = await axios({
        url: `http://127.0.0.1/api/product/${id}`,
        method: 'delete',
      });
      if (res.status !== 200) {
        message.warning(res.message, 2);
        return;
      }
      this.getProductList();
    } catch (err) {
      console.log(err);
    }
  }

  // 切换菜单
  handleMenu(e) {
    // console.log(e);
    this.setState(
      {
        curMenuId: e.target.value,
      },
      () => {
        sessionStorage.setItem('curMenuId', e.target.value);
        this.getProductList();
      },
    );
  }

  // 弹出新增窗口(使用箭头函数就不用去声明bind(this))
  handleAdd = () => {
    console.log(this.state.curMenuId);
    this.setState({
      visible: true,
      editObj: {},
    });
  };

  callback = () => {
    Promise.all([this.getMenuList()]).then(res => {
      this.getProductList();
    });
  };

  componentDidMount() {
    const menuId = sessionStorage.getItem('curMenuId');
    if (menuId) {
      this.setState(
        {
          curMenuId: Number(menuId),
        },
        () => {
          this.callback();
        },
      );
    } else {
      this.callback();
    }
  }

  setVisible = () => {
    this.setState({
      visible: false,
    });
  };

  // 确定
  setConfirmLoading = val => {
    this.setState({
      visible: false,
      confirmLoading: false,
    });
    console.log(val, 'val');
    if (this.state.editObj.id) {
      const params = {
        ...this.state.editObj,
        productname: val.props.productname,
        price: Number(val.price),
        desc: val.desc,
      };
      this.editProduct(params);
    } else {
      this.addProduct({
        ...val,
        productname: val.props.productname,
        price: Number(val.price),
        menuId: this.state.curMenuId,
      });
    }
  };

  // 编辑
  handleClick(record) {
    // console.log(record, '--');
    this.setState({
      visible: true,
      editObj: record,
    });
  }

  // 删除
  handleDelete(record) {
    console.log(record);
    const id = record.id;
    this.deleteProduct(id);
  }

  render() {
    const columns = [
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
      },
      {
        title: '更新时间',
        dataIndex: 'updateAt',
        key: 'updateAt',
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <div>
              <Button
                type="primary"
                onClick={this.handleClick.bind(this, record)}
                style={{ marginRight: '10px' }}
              >
                编辑
              </Button>

              <Button type="danger" onClick={this.handleDelete.bind(this, record)}>
                删除
              </Button>
            </div>
          );
        },
      },
    ];
    const { menuList, productList, curMenuId, visible, confirmLoading, editObj } = this.state;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" onClick={this.handleAdd}>
            新增
          </Button>
        </div>
        <div style={{ margin: '0 auto' }}>
          <Radio.Group defaultValue={curMenuId} value={curMenuId} buttonStyle="solid">
            {menuList.map(item => {
              return (
                <Radio.Button key={item.id} value={item.id} onChange={this.handleMenu}>
                  {item.name}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </div>
        <ModalBox
          visible={visible}
          confirmLoading={confirmLoading}
          setVisible={this.setVisible}
          setSure={this.setConfirmLoading}
          editObj={editObj}
        />
        <div style={{ margin: '20px 0' }}>
          <Table dataSource={productList} columns={columns} />
        </div>
      </div>
    );
  }
}
