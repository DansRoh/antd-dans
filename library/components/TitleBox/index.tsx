import React, { memo } from 'react';
import {
  ITitle,
} from 'library/components/Title';
import Title from 'library/components/Title';
import styles from './index.module.less';
import classNames from 'classnames';

export interface ITitleBox extends ITitle {
  children?: React.ReactNode
  className?: string;
  extraTitle?: string | React.ReactNode,
}

const TitleBox: React.FC<ITitleBox> = (props) => {
  const {
    children,
    title,
    className,
    extraTitle,
    ...remain
  } = props;
  return (
    <div className={classNames('title-box-component', styles.content, className)}>
      {
        title && <Title title={title} {...remain} extraTitle={extraTitle} />
      }
      {
        children
        && <div className={styles.box}>{children}</div>
      }
    </div>
  );
};
export default memo(TitleBox);
