export default {
  namespace: 'pro',
  // state 存储变量状态的仓库
  state: {
    list: [
      { name: 'dva', id: 1, key: 1 },
      { name: 'antd', id: 2, key: 2 },
      { name: 'vue', id: 3, key: 3 },
      { name: 'umi', id: 4, key: 4 },
      { name: 'element', id: 5, key: 5 },
      { name: 'react', id: 6, key: 6 },
    ],
    num: 1,
    title: 'products',
  },
  // 用于处理同步操作，唯一可以修改 state 的地方
  reducers: {
    delete(state, { payload: id }) {
      return {
        // 改变state中的数据必须要return出一个对象
        ...state,
        list: state.list.filter(item => item.id !== id),
      };
    },
  },
};
