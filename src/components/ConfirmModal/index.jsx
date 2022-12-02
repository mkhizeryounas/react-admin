import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';
const { confirm } = Modal;

const showConfirm = () => {
  confirm({
    icon: <ExclamationCircleOutlined />,
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const App = () => () => {
  return (
    <>
      <Button type='primary' onClick={showConfirm}>
        Confirm
      </Button>
    </>
  );
};
export default App;
