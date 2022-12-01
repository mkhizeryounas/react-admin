import React, { useState, useCallback } from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

const gridStyle = { minHeight: 550 };

const people = [
  {
    id: 1,
    name: 'Khizer',
    country: 'Pakistan',
    city: 'Lahore',
    age: '18',
  },
  {
    id: 2,
    name: 'Khizer 2',
    country: 'Pakistan',
    city: 'Lahore',
    age: '18',
  },
];

const columns = [
  {
    name: 'id',
    header: 'Id',
    defaultVisible: false,
    minWidth: 300,
    type: 'number',
  },
  { name: 'name', header: 'Name', defaultFlex: 1, minWidth: 250 },
  {
    name: 'country',
    header: 'Country',
    defaultFlex: 1,
    minWidth: 100,
  },
  { name: 'city', header: 'City', defaultFlex: 1, minWidth: 300 },
  { name: 'age', header: 'Age', minWidth: 150, type: 'number' },
];

const App = () => {
  const [dataSource, setDataSource] = useState(people);

  const onEditComplete = useCallback(
    ({ value, columnId, rowId }) => {
      console.log('value, columnId, rowId', value, columnId, rowId);
      const data = [...dataSource];
      data[rowId - 1][columnId] = value;

      setDataSource(data);
    },
    [dataSource]
  );

  return (
    <div>
      <ReactDataGrid
        idProperty='id'
        style={gridStyle}
        defaultFilterValue={null}
        onEditComplete={onEditComplete}
        editable={true}
        columns={columns}
        dataSource={dataSource}
        pagination
        onSortInfoChange={console.log}
        remoteSort={true}
      />
    </div>
  );
};

export default App;
