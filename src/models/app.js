export default {
  namespace: 'app',
  state: {
    name: 'test',
  },
  reducers: {
    change(state, { payload: title }) {
      return { name: title };
    },
  },
};
