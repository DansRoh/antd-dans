import {memo} from 'react';
import classNames from 'classnames';

import styles from './index.module.less';


const FilterWrap = ({ children }) => {
  return (
    <div className={classNames(styles.wrap, 'table-pro-filter-wrap')}>{ children }</div>
  );
};

export default memo(FilterWrap);
