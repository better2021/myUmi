import React, { createContext, useReducer } from 'react';

/**
 * @param {*} props
 * props.children相当于一个容器，可以嵌套任意的jsx节点
 * 使用自定义组件的时候，可以在其中嵌套 JSX 结构。
 * 嵌套的结构在组件内部都可以通过 props.children 获取到
 * this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;
 * 如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array
 * ColorContext.Provider中的组件可以共享value值
 */

const ColorContext = createContext({});

//export const UPDATE_COLOR = 'UPDATE_COLOR';

const reducer = (state, action) => {
  // switch (action.type) {
  //   case UPDATE_COLOR:
  //     return action.color;
  //   default:
  //     return state;
  // }
  return action.color;
};

const Color = props => {
  const [color, dispatch] = useReducer(reducer, 'blue');

  return (
    <ColorContext.Provider value={{ color, dispatch }}>{props.children}</ColorContext.Provider>
  );
};

export { Color, ColorContext };
