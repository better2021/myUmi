import { Upload, Icon, Modal, Table, Tag, Skeleton } from 'antd';
import { Component } from 'react';
import axios from '@/libs/axios';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const columns = [
  {
    title: 'star的项目名',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'start的数量',
    dataIndex: 'stargazers_count',
    width: 150,
    render: text => {
      return <Tag color="magenta">{text}</Tag>;
    },
  },
  {
    title: '语言',
    dataIndex: 'language',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 200,
    render: text => {
      return <span>{text.split('T')[0]}</span>;
    },
  },
  {
    title: '项目介绍homePage',
    dataIndex: 'homepage',
    render: text => {
      return (
        <a href={text} target={'_blank'}>
          {text}
        </a>
      );
    },
  },
  {
    title: '最近更新时间',
    dataIndex: 'pushed_at',
    width: 200,
    render: text => {
      return <span>{text.split('T')[0]}</span>;
    },
  },
  {
    title: '项目地址',
    dataIndex: 'html_url',
    render: text => {
      return (
        <a href={text} target={'_blank'}>
          {text}
        </a>
      );
    },
  },
];

class UpImg extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
    user: 'feiyuWeb',
    dataSource: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  async getData() {
    const { user } = this.state;
    const res = await axios({
      method: 'get',
      url: `/users/${user}/starred`,
      params: {
        page: 1,
        per_page: 100, // 上限是 100
      },
    });
    res.data.forEach(item => {
      item.key = item.id;
    });
    this.setState({
      dataSource: res.data,
    });
    console.log(res);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { previewVisible, previewImage, fileList, dataSource } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <img src="https://ghchart.rshah.org/feiyuWeb" alt="" />
        <div>
          {!!dataSource.length ? (
            <Table dataSource={dataSource} columns={columns} />
          ) : (
            <Skeleton active />
          )}
        </div>
      </div>
    );
  }
}

export default UpImg;
