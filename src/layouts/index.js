import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; //这个样式必须引入
import styles from './index.css';

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

let currHref = '';

function BasicLayout(props) {
  console.log(props, '----');
  const { href } = window.location; // 浏览器地址栏中的地址
  if (currHref !== href) {
    // currHref 和 href 不一致时说明进行了页面跳转
    NProgress.start(); // 页面开始加载时调用start方法
    if (!props.loading) {
      // loading 为false时表示页面加载完毕
      NProgress.done(); // 页面加载完成调用done方法
      currHref = href; // 将页面的href值赋值给currHref
    }
  }

  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  );
}

export default BasicLayout;
