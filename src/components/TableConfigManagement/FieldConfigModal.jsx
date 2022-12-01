import { Button, Modal, Form, Input, Select, Popconfirm, message } from 'antd';
import React, { useState, useEffect } from 'react';
const App = ({
  isOpen,
  selectedField = null,
  onDelete = () => {},
  closeModal = () => {},
  handleChange = () => {},
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [form] = Form.useForm();
  const initialValue = { type: 'text', name: '' };

  useEffect(() => {
    setIsModalOpen(isOpen);
    form.setFieldsValue(selectedField || initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleCancel = () => {
    setIsModalOpen(false);
    closeModal();
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    handleChange({ ...selectedField, ...values });
    handleCancel();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const footer = [
    <Button form='fieldConfig' type='primary' key='submit' htmlType='submit'>
      Save
    </Button>,
  ];

  if (selectedField) {
    footer.unshift(
      <Popconfirm
        title='Are you sure to delete this field?'
        onConfirm={() => {
          onDelete(selectedField.index);
          handleCancel();
          message.success('Field deleted');
        }}
        okText='Yes'
        cancelText='No'
      >
        <Button key='delete'>Delete</Button>
      </Popconfirm>
    );
  }

  return (
    <>
      <Modal
        title='Field configuration'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={footer}
      >
        {isOpen ? (
          <Form
            name='fieldConfig'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            layout='vertical'
            form={form}
            initialValues={initialValue}
          >
            <Form.Item
              label='Type'
              name='type'
              rules={[
                {
                  required: true,
                  message: 'This field is required',
                },
              ]}
            >
              <Select style={{ width: '100%' }}>
                <Select.OptGroup label={'Data Types'}>
                  <Select.Option value={'text'}>Text</Select.Option>
                  <Select.Option value={'link'}>Link to table</Select.Option>
                  <Select.Option value={'number'}>Number</Select.Option>
                  <Select.Option value={'boolean'}>Boolean</Select.Option>
                  <Select.Option value={'date'}>Date</Select.Option>
                  <Select.Option value={'file'}>File</Select.Option>
                  <Select.Option value={'single_select'}>
                    Single select
                  </Select.Option>
                  <Select.Option value={'multi_select'}>
                    Multiple select
                  </Select.Option>
                  <Select.Option value={'formula'}>Formula</Select.Option>
                </Select.OptGroup>
              </Select>
            </Form.Item>

            <Form.Item
              label='Name'
              name='name'
              rules={[
                {
                  required: true,
                  message: 'This field is required',
                },
              ]}
            >
              <Input placeholder='field_name' />
            </Form.Item>
          </Form>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};
export default App;
