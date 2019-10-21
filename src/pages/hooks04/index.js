import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Input, message, Skeleton } from 'antd';

function App() {
  const [name, setName] = useState('丽丽');
  const [sex, setSex] = useState('女');

  const inputRef = useRef(null);
  const [text, setText] = useState('');

  const handClick = () => {
    setText('hello useRef');
  };

  const handleChange = e => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const change = () => {
    console.log(inputRef.current.value);
  };

  return (
    <>
      <Button type="primary" onClick={() => setName('小红')}>
        姓名
      </Button>
      <Button type="primary" onClick={() => setSex('girl')}>
        性别
      </Button>
      <input ref={inputRef} onChange={change} />
      <Input value={text} onChange={handleChange} />
      <Button type="primary" onClick={handClick}>
        按钮
      </Button>
      <ChildComponent name={name}>{sex}</ChildComponent>
    </>
  );
}

function ChildComponent({ name, children }) {
  return (
    <>
      <div>{name}</div>
      <div>{children}</div>
    </>
  );
}

export default App;
