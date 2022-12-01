import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Space } from 'antd';
import ColumnConfig from './ColumnConfig';

const TableManagement = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type='dashed'
        onClick={showDrawer}
        style={{ width: '100%', margin: '10px 0' }}
      >
        <PlusOutlined />
        New table
      </Button>

      <Drawer
        title='Create new table'
        width={820}
        onClose={onClose}
        placement='left'
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        className='bootstrap-wrapper'
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type='primary'>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout='vertical' hideRequiredMark>
          <Form.Item
            name='table_name'
            label='Table name'
            rules={[
              {
                required: true,
                message: 'table_name',
              },
            ]}
          >
            <Input placeholder='table_name' />
          </Form.Item>

          <div>
            <ColumnConfig />
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default TableManagement;
