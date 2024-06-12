import React from 'react';

import styles from './index.module.less';


const TableListWrap = ({ children }) => {
  return (
    <div className={styles.wrap}>{ children }</div>
  );
};

export default TableListWrap;
