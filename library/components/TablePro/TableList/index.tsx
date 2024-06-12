import { Table, TableProps } from 'antd';
import React from 'react';

interface ITableList {
  tableProps: TableProps<any>
}
const TableList = ({ tableProps }: ITableList) => {
  return (
    <Table {...tableProps} />
  );
};

export default TableList;
