import React, { useState, useEffect, createContext, useContext, useReducer } from 'react';
import { Button, Input } from 'antd';

/**
 * <CountContext.Provider value={count} ></CountContext.Provider>  count就是共享的值
 */

/*
const CountContext = createContext(); // 创建共享的组件,CountContext为子组件，包含在CountContext.Provider 中

function Counter() {
  let count = useContext(CountContext); // useContext(组件) // 哪个组件传的就接受哪个组件的值
  return <h2>{count}</h2>;
}

const Hook = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>you clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        click
      </button>
      <CountContext.Provider value={count}>
        <Counter />
      </CountContext.Provider>
    </div>
  );
};
*/

/**
 *
 */
function ReduceDemo() {
  const [count, dispatch] = useReducer((state, action) => {
    switch (action) {
      case 'add':
        return state + 1;
      case 'sub':
        return state - 1;
      default:
        return state;
    }
  }, 0);

  return (
    <>
      <h2>现在的分数是{count}</h2>
      <Button
        type="primary"
        onClick={() => {
          dispatch('add');
        }}
      >
        add
      </Button>
      <Button
        type="danger"
        onClick={() => {
          dispatch('sub');
        }}
      >
        sub
      </Button>
    </>
  );
}

export default ReduceDemo;
