import { useCallback, useState } from 'react';
import { DataEditor, GridCellKind } from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';
import './style.scss';

const GridTable = () => {
  const singleRow = {
    name: 'Hines Fowler ' + Math.random(),
    company: 'BUZZNESS',
    email: 'hinesfowler@buzzness.com',
    phone: '+1 (869) 405-3127',
    active: true,
    image: 'https://picsum.photos/200/300',
  };
  const [data, setData] = useState(
    new Array(2).fill(0).map((_, i) => singleRow)
  );

  const columns = [
    {
      title: 'Name',
      id: 'name',
      icon: 'headerString',
    },
    {
      title: 'Company',
      id: 'company',
      icon: 'headerString',
    },
    {
      title: 'Email',
      id: 'email',
      icon: 'headerString',
    },
    {
      title: 'Phone',
      id: 'phone',
      icon: 'headerString',
    },
    {
      title: 'Active',
      id: 'active',
      kind: GridCellKind.Boolean,
      icon: 'headerBoolean',
      readonly: false,
    },
    // {
    //   title: 'Image',
    //   id: 'image',
    //   kind: GridCellKind.Image,
    //   icon: 'headerImage',
    // },
  ];

  const getCellIds = () => {
    return columns.map((e) => e.id);
  };

  const getContent = useCallback((cell) => {
    const [col, row] = cell;
    const dataRow = data[row];
    // dumb but simple way to do this
    const indexes = getCellIds();
    const d = dataRow[indexes[col]];
    const c = columns[col];
    return {
      kind: c.kind || GridCellKind.Text,
      allowOverlay: true,
      readonly: false,
      displayData: d,
      data: d,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCellEdited = useCallback((cell, newValue) => {
    // if (newValue.kind !== GridCellKind.Text) {
    //   // we only have text cells, might as well just die here.
    //   return;
    // }
    const indexes = getCellIds();
    const [col, row] = cell;
    const key = indexes[col];
    const newData = [...data];
    newData[row][key] = newValue.data;
    console.log('newData', newData);
    setData([...newData]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onColumnResize = useCallback((_, width, i) => {
    console.log(' columns[i]', columns[i], width);
    columns[i]['width'] = width;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='grid-table'>
      <div className='custom-grid-table'>
        <DataEditor
          getCellContent={getContent}
          onCellEdited={onCellEdited}
          columns={columns}
          rows={data.length}
          smoothScrollX={true}
          smoothScrollY={true}
          verticalBorder={true}
          width='100%'
          height='75vh'
          rowMarkers='both'
          isDraggable={true}
          onColumnResizeEnd={onColumnResize}
          onRowMoved={console.log}
          onRowAppended={console.log}
          trailingRowOptions={{
            hint: 'New row...',
            sticky: true,
            tint: true,
          }}
        />
        <div id='portal'></div>
      </div>
    </div>
  );
};

export default GridTable;
