import { useCallback, useState } from 'react';
import { DataEditor } from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';
import './style.scss';

import {
  useMockDataGenerator,
  clearCell,
  ColumnAddButton,
  SimpleThemeWrapper,
} from './utils';

const GridTable = () => {
  const {
    cols,
    getCellContent,
    setCellValueRaw,
    setCellValue,
    onColumnResize,
  } = useMockDataGenerator(10, false);

  const [numRows, setNumRows] = useState(50);

  const onRowAppended = useCallback(() => {
    const newRow = numRows;
    for (let c = 0; c < cols.length; c++) {
      const cell = getCellContent([c, newRow]);
      setCellValueRaw([c, newRow], clearCell(cell));
    }
    setNumRows((cv) => cv + 1);
  }, [cols.length, getCellContent, numRows, setCellValueRaw]);

  return (
    <div className='grid-table'>
      <div className='custom-grid-table'>
        <SimpleThemeWrapper>
          <DataEditor
            getCellContent={getCellContent}
            onCellEdited={setCellValue}
            columns={cols}
            rows={numRows}
            smoothScrollX={true}
            smoothScrollY={true}
            overscrollX={100}
            scaleToRem={true}
            theme={{
              baseFontStyle: '0.8125rem',
              headerFontStyle: '600 0.8125rem',
              editorFontSize: '0.8125rem',
            }}
            verticalBorder={true}
            width='100%'
            height='75vh'
            rowMarkers='both'
            isDraggable={'cell'}
            onColumnResize={onColumnResize}
            onRowMoved={console.log}
            onRowAppended={onRowAppended}
            trailingRowOptions={{
              hint: 'New row...',
              sticky: true,
              tint: true,
            }}
            rightElement={
              <ColumnAddButton>
                <button onClick={() => window.alert('Add a column!')}>+</button>
              </ColumnAddButton>
            }
            rightElementProps={{
              fill: false,
              sticky: true,
            }}
          />
          <div id='portal'></div>
        </SimpleThemeWrapper>
      </div>
    </div>
  );
};

export default GridTable;
