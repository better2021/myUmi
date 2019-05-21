import { useState, useEffect } from 'react';
import axios from '@/libs/axios';
import { Spin, Card } from 'antd';

function UserInfo(props) {
  const [info, setInfo] = useState({});

  const getInfoData = async () => {
    const res = await axios({
      url: `/users/${props.name}`,
      method: 'GET',
    });
    if (res.status !== 200) {
      console.log(res.statusText);
      return false;
    }
    //console.log(res);
    const data = res.data;
    setInfo(data);
  };

  useEffect(
    () => {
      getInfoData();
    },
    [props.name],
  );

  const { Meta } = Card;
  return (
    <div>
      <p>{props.title}</p>
      {Object.keys(info).length === 0 ? (
        <Spin size="large" tip="Loading..." />
      ) : (
        <div>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={info.avatar_url} />}
          >
            <Meta title={info.bio} description={info.html_url} />
          </Card>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
