import axios from '@/libs/axios';

// 这里的name值就是从call的payload传来的参数
export async function getInfoData(name) {
  const res = await axios({
    url: `/users/${name}`,
    method: 'GET',
  });
  if (res.status !== 200) {
    console.log(res.statusText);
    return false;
  }
  const data = res.data;
  return data;
}
