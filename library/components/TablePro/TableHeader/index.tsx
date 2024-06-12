import React from 'react';
import { Space, Divider } from 'antd';
import styles from './index.module.less';

export interface ITableHeader {
  title?: string | React.ReactNode;
  rightSlot?: React.ReactNode;
}
const TableHeader: React.FC<ITableHeader> = ({
  title,
  rightSlot
}) => {
  return (
    <div>
      <div className={styles.box}>
        {
          title && <h4 className={styles.title}>{title}</h4>
        }
        {
          rightSlot && <Space size={24}>{rightSlot}</Space>
        }
      </div>
      <Divider />
    </div>
  );
};
export default TableHeader;
