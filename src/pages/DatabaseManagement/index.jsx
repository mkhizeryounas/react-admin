import {
  Layout,
  PageHeader,
  Button,
  Menu,
  Dropdown,
  Empty,
  Modal,
  message,
} from 'antd';
import {
  SettingOutlined,
  SyncOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

import './style.scss';
import axios from '../../utils/axios';

import TableManagement from '../../components/TableManagement';
// import GridTable from '../../components/GridTable';
import GridTable from '../../components/GlideGrid';

const { Sider, Content } = Layout;
const { confirm } = Modal;

const DatabaseManagement = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const [editTableId, setEditTableId] = useState(false);

  const showConfirm = (cb) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: 'Once deleted, you will not be able to recover this table!',
      onOk() {
        cb();
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item
        key='1'
        onClick={() => {
          setEditTableId(selectedTable._id);
        }}
        icon={<SettingOutlined />}
      >
        Edit configuration
      </Menu.Item>
      <Menu.Item key='2' icon={<SyncOutlined />}>
        Refresh
      </Menu.Item>
      <Menu.Item
        key='3'
        icon={<DeleteOutlined />}
        onClick={() => {
          showConfirm(() => {
            handleDelete(selectedTable._id);
          });
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  const handleTableSelect = async (id) => {
    console.log('handleTableSelect', id);
    if (!id) {
      return;
    }
    const { data: table } = await axios.get(`/tables/${id}/configuration`);
    setSelectedTable(table);
  };

  const refreshTableList = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/tables/${id}`);
    message.success('Table deleted successfully');
    setSelectedTable(null);
    refreshTableList();
  };

  return (
    <>
      <Layout className=''>
        <Sider width={250} className='side-panel'>
          <TableManagement
            onTableSelect={handleTableSelect}
            refresh={refreshCount}
            refreshTableList={refreshTableList}
            editTableId={editTableId}
            setEditTableId={setEditTableId}
          />
        </Sider>

        <Content
          style={{
            marginLeft: '260px',
            overflow: 'initial',
            padding: '10px 0',
          }}
        >
          {selectedTable ? (
            <>
              <div className=''>
                <PageHeader
                  style={{ paddingLeft: '0', paddingRight: '0' }}
                  title={
                    <>
                      <tt>{selectedTable.name}</tt>
                      <br />

                      <small style={{ fontSize: '65%', color: '#777' }}>
                        <code>/tables/{selectedTable._id}</code>
                      </small>
                    </>
                  }
                  subTitle={<></>}
                  extra={[
                    <Dropdown key='0' overlay={menu}>
                      <Button>
                        <EllipsisOutlined /> More
                      </Button>
                    </Dropdown>,
                    <Button key='2' type='primary'>
                      New record
                    </Button>,
                  ]}
                />
              </div>
              <div className='row'>
                <div className='col'>
                  <GridTable />
                </div>
              </div>
            </>
          ) : (
            <>
              <Empty description={'No table selected'} />
            </>
          )}
        </Content>
      </Layout>
    </>
  );
};

export default DatabaseManagement;
