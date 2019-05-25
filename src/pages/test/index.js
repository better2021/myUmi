import React, { Component } from 'react';
import { Button } from 'antd';
import router from 'umi/router';
import Welcome from '@/components/Welcome';

import { connect } from 'dva';
import ProductList from '@/components/ProductList';

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

class Test extends Component {
  jumpUrl() {
    router.push({ pathname: '/about' });
  }

  handleDelete = id => {
    // console.log(id, 'id');
    const { dispatch } = this.props;
    /**
     * dispatch 是一个函数方法，用来将 Action 发送给 State
     * dispatch 方法从哪里来？被 connect 的 Component 会自动在 props 中拥有 dispatch 方法。
     */
    dispatch({
      type: 'pro/delete', // pro就是自己定义的namespace(命名空间),delete 是自己定义在reducer中的删除方法
      payload: id, // payload: id 为传给pro/delete的值
    });

    dispatch({
      type: 'app/change',
      payload: `删除的元素id为${id}`,
    });
  };

  render() {
    const numbers = [1, 3, 5, 8, 9];
    const { list } = this.props.rootState.pro;
    const { title } = this.props.rootState.app;
    return (
      <div style={{ padding: '20px' }}>
        <ProductList onDelete={this.handleDelete} products={list} />
        <h3 style={{ color: 'pink' }}>{title}</h3>
        <Button type="primary" onClick={this.jumpUrl.bind(this)}>
          页面跳转
        </Button>
        <NumberList numbers={numbers} />
        <Welcome color="pink" isShow={true} />
        <Welcome color="blue" isShow={false} />
      </div>
    );
  }
}

/**
 * rootState可以自己随意命名
 * connect 方法传入的第一个参数是 mapStateToProps 函数，mapStateToProps 函数会返回一个对象，
 * 用于建立 State 到 Props 的映射关系
 */
export default connect(rootState => {
  return {
    rootState, // 把state中的数据赋值给connect包含组件(Test)的props
  };
})(Test);
