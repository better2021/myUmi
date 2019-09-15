import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const CustomForm = props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form className="login-form">
      <Form.Item label="产品名称">
        {getFieldDecorator('props.productname', {
          initialValue: props.productname,
          rules: [{ required: true, message: '请输入产品名称!' }],
        })(<Input placeholder="请输入产品名称" />)}
      </Form.Item>
      <Form.Item label="产品价格">
        {getFieldDecorator('price', {
          initialValue: props.price,
          rules: [{ required: true, message: '请输入产品价格!' }],
        })(<Input placeholder="请输入产品价格" />)}
      </Form.Item>
      <Form.Item label="产品描述">
        {getFieldDecorator('desc', {
          initialValue: props.desc,
          rules: [{ required: true, message: '请输入产品描述!' }],
        })(<Input placeholder="请输入产品描述" />)}
      </Form.Item>
    </Form>
  );
};

const MyForm = Form.create({ name: 'normal_login' })(CustomForm);

class ModalBox extends Component {
  handleOk = e => {
    e.preventDefault();
    this.myForm.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      this.props.setSure(values);
    });
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.props.setVisible(); // 触发父组件事件改变visible的值
  };

  render() {
    const { visible, confirmLoading, editObj } = this.props;
    // console.log(editObj, 'editObj-----');

    return (
      <div>
        <Modal
          title="新增"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <MyForm
            productname={editObj.productName}
            price={editObj.price}
            desc={editObj.desc}
            handleSubmit={this.handleOk}
            ref={c => (this.myForm = c)}
          />
        </Modal>
      </div>
    );
  }
}

export default ModalBox;
