import { getInfoData } from '@/request/userInfo';

export default {
  namespace: 'app',
  state: {
    title: 'test',
    userInfo: {},
  },
  reducers: {
    change(state, { payload: title }) {
      return { name: title };
    },
    userData(state, { payload: res }) {
      return { userInfo: res };
    },
  },
  effects: {
    *getInfo({ payload }, { call, put }) {
      const res = yield call(getInfoData, payload); // call用来执行异步函数,payload为接受的参数
      yield put({
        type: 'userData',
        payload: res,
      });
    },
  },
};
