import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Space, message } from 'antd';
import ColumnConfig from './ColumnConfig';
import axios from '../../utils/axios';

const TableConfigManagement = ({
  editTableId = false,
  setEditTableId = () => {},
  refreshTableList = () => {},
  onTableSelect = () => {},
}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const isEditing = !!editTableId;

  const setTableConfig = async (id) => {
    try {
      const { data } = await axios.get(`/tables/${id}/configuration`);
      form.setFieldsValue(data);
    } catch (err) {}
  };

  useEffect(() => {
    if (editTableId) {
      message.loading('Loading table configuration...');
      setTableConfig(editTableId).then(() => {
        setOpen(true);
        message.destroy();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTableId]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setEditTableId(null);
    form.setFieldsValue({ fields: [], name: '' });
  };

  const handleSubmit = async (values) => {
    console.log('submit', values);
    try {
      const { data } = await axios.post('/tables', values);
      console.log('data', data);
      message.success('Table created');
      onClose();
      await refreshTableList();
      onTableSelect(data._id);
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <>
      <Button
        type='dashed'
        onClick={showDrawer}
        style={{ width: '100%', margin: '10px 0' }}
      >
        <PlusOutlined />
        Add Table
      </Button>

      <Drawer
        title={isEditing ? 'Edit table' : 'New table'}
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
            <Button
              form='tableConfig'
              type='primary'
              key='submit'
              htmlType='submit'
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout='vertical'
          form={form}
          name='tableConfig'
          onSubmitCapture={console.log}
          hideRequiredMark
          onFinish={handleSubmit}
          initialValues={{
            name: '',
            fields: [],
          }}
        >
          <Form.Item
            name='name'
            label='Table name'
            rules={[
              {
                required: true,
                message: 'This field is required',
              },
            ]}
          >
            <Input placeholder='table_name' />
          </Form.Item>

          <div>
            <Form.Item
              name='fields'
              rules={[
                {
                  required: true,
                  message: 'Please create at least one field',
                },
              ]}
            >
              {open ? (
                <ColumnConfig
                  onChange={(fields) => {
                    form.setFieldsValue({ fields });
                  }}
                  defaultFields={form.getFieldValue('fields')}
                />
              ) : (
                <></>
              )}
            </Form.Item>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default TableConfigManagement;
