import React from 'react';
import {Space, Divider} from 'antd';
import styles from './index.module.less';

export interface ITitle {
  title?: string | React.ReactNode,
  rightSlot?: React.ReactNode,
  leftSlot?: React.ReactNode,
  titleClass?: 'H1' | 'H2',
  extraTitle?: string | React.ReactNode,
}

/** 页面标题组件 */
const Title: React.FC<ITitle> = ({
  title,
  rightSlot,
  leftSlot,
  titleClass = 'H1',
  extraTitle
}) => {
  return (
    <div className={styles.title}>
      <div className={styles.box}>
        <div className={styles.left}>
          {
            title && <h4 className={styles[`title${titleClass}`]}>{title}</h4>
          }
          {
            leftSlot && <div>{leftSlot}</div>
          }
        </div>
        {
          rightSlot && <Space className={styles.right} size={24}>{rightSlot}</Space>
        }
      </div>
      {extraTitle && <div className={styles.extraTitle}>{extraTitle}</div>}
      <Divider className={styles.divider}/>
    </div>
  );
};
export default Title;
