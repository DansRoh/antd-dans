import React from 'react';
import GridLayout from 'library/components/GridLayout';
import styles from './index.less';

function LinkList() {
  return (
    <div className={styles.box}>
      <div className={styles.title}>快捷链接</div>
      <GridLayout number={3} gutter={20}>
        <li>巴南区网上办事大厅</li>
        <li>巴南区人民政府网</li>
        <li>重庆市医保服务平台</li>
        <li>重庆市人社局</li>
        <li>巴南网</li>
      </GridLayout>
    </div>
  );
}
export default LinkList;
