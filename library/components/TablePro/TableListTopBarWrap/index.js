import React from 'react';

import styles from './index.module.less';


const TableListTopBar = ({ children }) => {
  return (
    <div className={styles.wrap}>{ children }</div>
  );
};

export default TableListTopBar;
