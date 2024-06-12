import React from 'react';
import { PaginationProps } from 'antd';
import { IConfigItem } from 'library/components/FormPro/types';
import { ITableHeader } from '../TablePro/TableHeader';
import { IGridLayoutProps } from '../GridLayout';
import { NavigateOptions, To } from 'react-router-dom';

export interface IRequestParams {
  index: number;
  size: number;
  [key: string]: any;
}

export type IShowTotal = boolean | ((total: number) => React.ReactNode);

export interface ICardListProps extends ITableHeader {
  className?: string;
  /**
   * @description 列表的请求
   */
  request?: (info: IRequestParams) => Promise<any>;
  /**
   * @description 请求的其他参数
   */
  params?: {[x: string]: any};
  /**
   * @description 筛选表单的配置项
   */
  filterItems?: IConfigItem[];
  /**
   * @description 用于格式化筛选参数
   */
  formatFilterParams?: <T>(postData: T) => T;
  /**
   * @description 导出的回调函数，如果不设置则不回渲染"导出"按钮
   */
  onExport?: (params: any, pagination: any) => void;
  /**
   * @description 是否展示
   * @default false
   */
  showTotal?: IShowTotal;
  /**
   * @description 筛选表单的label宽度
   */
  labelWidth?: string;
  children?: any;
  /**
   * @description 布局配置，参考GridLayout组件
   */
  layout?: Omit<IGridLayoutProps, 'children'>;
  /**
   * @description 分页配置，更多配置项，请查看 antd的Pagination
   */
  pagination?: PaginationProps;
  /**
   * @description GridLayout布局前置内容
   */
  addonBefore?: string | React.ReactNode;
  /**
   * @description GridLayout布局后置内容
   */
  addonAfter?: string | React.ReactNode;
  /**
   * @description 自定义title
   */
  customTitle?: React.ReactNode
  /**
   * @description 默认 false。 即在初始化时自动执行 service。如果设置为 true，则需要手动调用 run 或 runAsync 触发执行。
   * @default false
   */
  manual?: boolean;
  /**
   * @description 设置字段组件的尺寸（仅限 antd 组件）
   * @default middle
   */
  size?: 'small' | 'middle' | 'large'
}


export interface ICardListRef {
  /**
   * @description 手动触发 service 执行，参数会传递给 service
   */
  run(...params: any[]): void;
  refresh: (toFirstPage?: boolean) => void;
  navigateWithState: (to: To, options?: NavigateOptions | undefined) => void;
};
