import React, { isValidElement } from 'react';
import Full from './Full';
import styles from './index.module.less';

export interface IGridLayoutProps {
  /**
   *
   * @description 设置一行展示要展示多少个的元素
   * @default 1
   */
  number?: number;
   /**
   *
   * @description 子元素之间的间隔
   * @default 0
   */
    gutter?: number;
  /**
   * @description 子元素
   */
  children: React.ReactNode;
  /**
   * @description 样式名
  */
  className?: string;
   /**
   * @description 最后一项是否填充整行
   * @default false
  */
  autoExtend?: boolean
}

export const GridLayout: React.FC<IGridLayoutProps> & { Full: typeof Full } = ({
  number = 1,
  children,
  gutter = 0,
  className,
  autoExtend = false
}) => {
  const childCount = React.Children.count(children);
  const width = 100 / number;
  const gutterStyle = gutter ? { marginLeft: -gutter + 'px', marginRight: -gutter + 'px' } : undefined;
  const colStyle = gutter
    ? Object.assign(
      { paddingLeft: gutter + 'px', paddingRight: gutter + 'px' },
      { width: `${width}%` }
    )
    : { width: `${width}%` };
  return (
    <div className={`${styles.layout} ${className || ''}`} style={gutterStyle}>
      {React.Children.map(children, (child, index) => {
        let colCss = colStyle;
        // 用于判断是否是最后一个元素
        const isLastElement = index === childCount - 1;
        // 计算还剩余几项
        const remainCount = childCount % number === 0 ? 0 : number - (childCount % number);
        if (isValidElement(child)) {
          // 如果是最后一个元素，且宽度需要自动填充时重新计算宽度。例如筛选组件的操作按钮通常会占满剩余的空间
          if　(isLastElement && remainCount && autoExtend) {
            colCss = Object.assign({}, colStyle, { width: `${width * (remainCount + 1)}%` });
          }
          colCss = child.type === Full ? Object.assign({}, colStyle, { width: '100%' }) : colCss;
        }
        return (
          <div
            className={styles.col}
            style={colCss}>
            {child}
          </div>
        );
      })}
    </div>
  );
};
GridLayout.Full = Full;
export default GridLayout;
