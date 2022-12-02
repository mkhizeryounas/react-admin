import { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './style.scss';
import FieldConfigModal from './FieldConfigModal';

const ColumnConfig = ({ defaultFields = [], onChange = () => {} }) => {
  const [fields, setFields] = useState(defaultFields);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedField, setSelectedField] = useState(null);

  useEffect(() => {
    onChange(fields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  const handleDelete = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, record) => {
        return _;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (_) => {
        return <div className='col'>{_}</div>;
      },
    },
    {
      title: '',
      render: (e, _, index) => {
        return (
          <div className='col'>
            <Badge count={0}>
              <Button
                onClick={() => {
                  setSelectedField({ ...e, index });
                  setIsModalOpen(true);
                }}
              >
                <SettingOutlined />
              </Button>
            </Badge>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <FieldConfigModal
        onDelete={handleDelete}
        isOpen={isModalOpen}
        selectedField={selectedField}
        closeModal={() => {
          setIsModalOpen(false);
        }}
        handleChange={(field) => {
          if (field.index) {
            const newFields = [...fields];
            newFields[field.index] = field;
            setFields(newFields);
          } else {
            setFields([...fields, field]);
          }
        }}
      />
      <div className='row'>
        <div className='col'>
          <b>CONFIGURE FIELDS</b>
        </div>
        <div className='col-auto'>
          <Button
            small='small'
            onClick={() => {
              setSelectedField(null);
              setIsModalOpen(true);
            }}
          >
            Add new
          </Button>
        </div>
      </div>
      <div
        style={{
          overflowX: 'auto',
        }}
      >
        <Table dataSource={fields} pagination={false} columns={columns} />
      </div>
    </>
  );
};

export default ColumnConfig;
