import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Tag, Button } from 'antd';

const ProductList = ({ onDelete, products }) => {
  /**
   * 这里的{ onDelete, products }就是props的解构
   * 相当于 const { onDelete, products } = props
   */

  // 获取随机颜色
  function color() {
    return '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Tag',
      render: (text, record) => {
        // console.log(text, record);
        return <Tag color={color()}>{record.name}</Tag>;
      },
    },
    {
      title: 'Actions',
      render: (text, record) => {
        return (
          <Popconfirm title="Delete" onConfirm={() => onDelete(record.id)}>
            <Button type="primary">Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];

  return <Table dataSource={products} columns={columns} />;
};

/**
 * 使用 PropTypes 进行类型检查
 * 当传入的 prop 值类型不正确时，JavaScript 控制台将会显示警告
 */
ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductList;
