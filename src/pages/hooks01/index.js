import React, { useState, useEffect } from 'react';
import { Button, Card, Input, message, Skeleton } from 'antd';

// const Hook = () => {
//   const [{ count, count2 }, setCount] = useState({ count: 10, count2: 20 });

//   return (
//     <>
//       <Button
//         onClick={() =>
//           setCount(currentcount => ({
//             ...currentcount,
//             count: currentcount.count + 1,
//           }))
//         }
//       >
//         +
//       </Button>
//       <div>hi hook {count}</div>
//       <div>count2:{count2}</div>
//     </>
//   );
// };

// const Hook = () => {
//   const [count, setCount] = useState(10);
//   const [count2, setCount2] = useState(20);
//   const [num, setNum] = useState(10);

//   const handleClick = () => {
//     setNum(num - 1);
//   };

//   return (
//     <>
//       <Button
//         onClick={() => {
//           setCount(count + 1); // count + 1
//           setCount2(c => c + 2); // c => c + 2 箭头函数，这两个是等价的
//         }}
//       >
//         +
//       </Button>
//       <Button onClick={handleClick}> - </Button>
//       <div>hi hook {count}</div>
//       <div>count2:{count2}</div>
//       <p>num:{num}</p>
//     </>
//   );
// };

const Fetch = () => {
  const [result, setResult] = useState({});
  const [name, setName] = useState('武汉');

  useEffect(
    () => {
      fetch(`https://www.apiopen.top/weatherApi?city=${name}`)
        .then(res => res.json())
        .then(res => {
          if (res.code === 201) {
            return message.error(res.msg);
          }
          setResult(res.data);
        });
    },
    [name], // 第二个参数为数组形式的依赖项，当依赖项变化时就会触发渲染，[]数组表示只渲染一次
  );

  const { Search } = Input;

  const handSearch = value => {
    if (value.trim() !== '') {
      setName(value);
    } else {
      message.info('请输入查询的地区');
    }
  };

  return (
    <>
      <h3>温馨提示：{result.ganmao}</h3>
      <h2>最近天气</h2>
      <Search
        placeholder="请输入要搜索的地区"
        enterButton="查询天气"
        size="default"
        onSearch={handSearch}
        style={{ maxWidth: '300px' }}
      />

      {Object.keys(result).length ? (
        result.forecast &&
        result.forecast.map((item, index) => (
          <Card key={index} style={{ maxWidth: '300px' }}>
            <p>地区：{result.city}</p>
            <p>日期：{item.date}</p>
            <p>天气：{item.type}</p>
            <p>最高温：{item.high}</p>
            <p>最低温：{item.low}</p>
            <p>风向：{item.fengxiang}</p>
          </Card>
        ))
      ) : (
        <Skeleton active />
      )}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Fetch />
    </div>
  );
}

export default App;
