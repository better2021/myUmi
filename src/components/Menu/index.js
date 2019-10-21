import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';

const { SubMenu } = Menu;

class Sider extends Component {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    const styles = {
      width: '180px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 99,
    };
    return (
      <Menu
        mode="inline"
        theme="dark"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ ...styles }}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>Navigation One</span>
            </span>
          }
        >
          <Menu.Item key="1">
            <Link to="/blog">blog</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">about</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/test">test</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/product">product</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="appstore" />
              <span>Navigation Two</span>
            </span>
          }
        >
          <Menu.Item key="5">
            <Link to="/count">count</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/hook">hook</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/getDate">getDate</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="setting" />
              <span>Navigation Three</span>
            </span>
          }
        >
          <Menu.Item key="9">
            <Link to="/user">user</Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link to="/upImg">upImg</Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/speak">speak</Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link to="/hooks01">hooks01</Link>
          </Menu.Item>
          <Menu.Item key="13">
            <Link to="/hooks02">hooks02</Link>
          </Menu.Item>
          <Menu.Item key="14">
            <Link to="/hooks03">hooks03</Link>
          </Menu.Item>
          <Menu.Item key="15">
            <Link to="/hooks04">hooks04</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default Sider;
