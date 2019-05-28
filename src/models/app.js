import { getInfoData } from '@/request/userInfo';

export default {
  namespace: 'app',
  state: {
    title: 'feiyuWeb',
    userInfo: {},
  },
  reducers: {
    change(state, { payload: title }) {
      return { ...state, name: title };
    },
    userData(state, { payload: res }) {
      // 接受effects中put传来的res值
      return { ...state, userInfo: res }; // 把res值赋值给state中的userInfo
    },
  },
  effects: {
    *getInfo({ payload }, { call, put }) {
      const res = yield call(getInfoData, payload); // call用来执行异步函数,payload为接受的参数
      yield put({
        type: 'userData',
        payload: res, // 把接口获取的res值传给reducers中的userData
      });
    },
  },
};
