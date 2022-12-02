import { useEffect, useState } from 'react';
import { Menu, Button } from 'antd';
import axios from '../../utils/axios';
import './style.scss';
import {
  SyncOutlined,
  LoadingOutlined,
  TableOutlined,
} from '@ant-design/icons';
import TableConfigManagement from '../TableConfigManagement';

const TableManagement = ({
  onTableSelect = () => {},
  refresh = 0,
  refreshTableList = () => {},
}) => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getTables = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/tables`);
      setTables(
        data?.map((e) => ({
          icon: <TableOutlined />,
          label: e.name,
          key: e._id,
        })) || []
      );
    } catch (err) {}
    setIsLoading(false);
  };

  useEffect(() => {
    if (!selectedTable) {
      const newSelectedTable = tables[0]?.key || null;
      setSelectedTable(newSelectedTable);
      onTableSelect(newSelectedTable);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tables]);

  useEffect(() => {
    getTables();
  }, [refresh]);

  return (
    <>
      <TableConfigManagement
        refreshTableList={refreshTableList}
        onTableSelect={(id) => {
          onTableSelect(id);
          setSelectedTable(id);
        }}
      />

      <div className='row'>
        <div className='col title-text'>
          <b>All tables</b>
        </div>
        <div className='col-auto'>
          <Button type='link' small='small' onClick={getTables}>
            {isLoading ? <LoadingOutlined /> : <SyncOutlined />}
          </Button>
        </div>
      </div>
      <div style={{ paddingBottom: '80px' }}>
        {tables?.length ? (
          <>
            <Menu
              items={tables}
              onClick={(e) => {
                setSelectedTable(e.key);
                onTableSelect(e.key);
              }}
              selectedKeys={[selectedTable]}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default TableManagement;
