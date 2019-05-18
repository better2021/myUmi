// ref: https://umijs.org/config/
export default {
  base: '/umiShow/', //指定 react-router 的 base，部署到非根目录时需要配置
  publicPath: '/umiShow/', // 指向打包后静态资源文件所在的路径
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          immer: true,
        },
        dynamicImport: { webpackChunkName: true },
        title: 'myumi',
        dll: true,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
