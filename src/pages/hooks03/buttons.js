import React, { useContext } from 'react';
import { Button } from 'antd';

import { ColorContext } from './color';

function Buttons() {
  const { dispatch } = useContext(ColorContext);

  return (
    <div>
      <Button type="primary" onClick={() => dispatch({ color: 'red' })}>
        红色
      </Button>
      <Button type="primary" onClick={() => dispatch({ color: 'pink' })}>
        粉色
      </Button>
      <Button type="primary" onClick={() => dispatch({ color: 'yellow' })}>
        黄色
      </Button>
    </div>
  );
}

export default Buttons;
