function Fancy(props) {
  return <div style={{ color: props.color }}>{props.children}</div>;
}

function Welcome(props) {
  const time = new Date().toLocaleDateString();
  return (
    <Fancy color={props.color}>
      {props.isShow && <h3>北京时间:{time}</h3>}
      <p>Welcome to React</p>
    </Fancy>
  );
}

export default Welcome;
