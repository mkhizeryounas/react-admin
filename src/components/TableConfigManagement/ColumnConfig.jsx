import { useState } from 'react';
import { Table, Button, Badge } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './style.scss';
import FieldConfigModal from './FieldConfigModal';

const ColumnConfig = () => {
  const [fields, setFields] = useState([
    {
      default: null,
      isRequired: false,
      pattern: null,
      isMultiSelect: false,
      link: null,
      _id: '638836ce2458680d0a9a383a',
      name: 'First Name',
      type: 'text',
      options: [],
      order: 0,
    },
    {
      default: null,
      isRequired: false,
      pattern: null,
      isMultiSelect: false,
      link: null,
      _id: '638836ce2458680d0a9a383b',
      name: 'Last Name',
      type: 'text',
      options: [],
      order: 1,
    },
    {
      default: null,
      isRequired: false,
      pattern: '^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$',
      isMultiSelect: false,
      link: null,
      _id: '638836ce2458680d0a9a383c',
      name: 'Postal Code',
      type: 'text',
      options: [],
      order: 2,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedField, setSelectedField] = useState(null);

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
