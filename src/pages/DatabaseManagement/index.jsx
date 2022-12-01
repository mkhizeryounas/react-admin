import { Layout, PageHeader, Button, Menu, Dropdown, Empty } from 'antd';
import {
  SettingOutlined,
  SyncOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

import './style.scss';
import axios from '../../utils/axios';

import TableManagement from '../../components/TableManagement';
import GridTable from '../../components/GridTable';

const { Sider, Content } = Layout;

const DatabaseManagement = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const menu = (
    <Menu>
      <Menu.Item key='1' icon={<SettingOutlined />}>
        Edit configuration
      </Menu.Item>
      <Menu.Item key='2' icon={<SyncOutlined />}>
        Refresh
      </Menu.Item>
      <Menu.Item
        key='3'
        icon={<DeleteOutlined />}
        onClick={() => handleDelete(selectedTable._id)}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  const handleTableSelect = async (id) => {
    if (!id) {
      return;
    }
    const { data: table } = await axios.get(`/tables/${id}`);
    setSelectedTable(table);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/tables/${id}`);
    setSelectedTable(null);
    setRefreshCount(refreshCount + 1);
  };

  return (
    <>
      <Layout className=''>
        <Sider width={250} className='side-panel'>
          <TableManagement
            onTableSelect={handleTableSelect}
            refresh={refreshCount}
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
                  breadcrumb={{
                    routes: [{ breadcrumbName: 'Table' }],
                  }}
                  title={
                    <>
                      <tt>{selectedTable.name}</tt>
                    </>
                  }
                  subTitle={''}
                  extra={[
                    <Dropdown key='0' onClick={console.log} overlay={menu}>
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
