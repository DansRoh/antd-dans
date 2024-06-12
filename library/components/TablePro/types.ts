import React, { ComponentProps } from 'react';
import {FormInstance, Table} from 'antd';
import { IConfigItem, IFormGridLayout } from 'library/components/FormPro/types';
import { ITableHeader } from './TableHeader';
import { To, NavigateOptions } from 'react-router-dom';
import { ColumnType } from 'antd/es/table';

export interface IRequestParams {
  index: number;
  size: number;
  [key: string]: any;
}

export interface IValueDict {
  [key: string]: any;
}

export interface TableColumnProps<RecordType> extends ColumnType<RecordType> {
  children?: any[];
}
export interface ICustomColumnsProp<T = any> extends TableColumnProps<T> {
  /**
   * @description 值为空时显示的值
   * @default --
   */
  nullDefaultValue?: string;
  /**
   * @description 设置最大字符个数，多余的...展示
   */
  max?: number;
  /**
   * @description 设置值的字典， 支持对象和数组
   * @example {1: '完成', 0: '未完成'} | [{label: '完成', value: '1'}, {label: '未完成', value: '0'}]
   */
  valueDict?: IValueDict | {label: string; value: any}[];
  /**
   * @description 时间格式化， 同dayjs.format方法 
   */
  dateFormat?: string;
}
export interface ITableProps extends Omit<ComponentProps<typeof Table>, 'columns'> {
  columns?: ICustomColumnsProp[];
}
export type IShowTotal = boolean | ((total: number) => React.ReactNode);

export type IParams = [{ [key: string]: any; current: number; pageSize: number; }, any]
export interface ITableProProps extends ITableHeader {
  /**
   * @description 列表的请求
   */
  request: (info: IRequestParams) => Promise<any>;
  /**
   * @description 设置表格的属性，详细参考antd提供的表格属性
   */
  tableProps: ITableProps;
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
   * @description 导出按钮权限
   */
  exportPermission?: string;
  /**
   * @description 自定义表格和筛选之间的区域
   */
  tableTopBar?: React.ReactNode;
  /**
   * @description 筛选表单的label宽度
   */
  labelWidth?: string;
  /**
   * @description 值为空时显示的值
   * @default --
   */
  nullDefaultValue?: string;
  /**
   * @description 是否展示序号
   * @default false
   */
  hasSerialNo?: boolean;
  /**
   * @description 是否展示
   * @default false
   */
  showTotal?: IShowTotal;
  /**
   * @description 默认 false。 即在初始化时自动执行 service。如果设置为 true，则需要手动调用 run 或 runAsync 触发执行。
   * @default false
   */
  manual?: boolean;
  /**
   * @description 默认参数，第一项为分页数据，第二项为表单数据
   */
  defaultParams?: IParams;
  /**
   * @description 表单默认值
   */
  initialValues?: any
  /**
   * @description form 表单的布局配置
   */
  gridLayout?: IFormGridLayout;
  /**
   * @description form 表单提交时的其他参数
   */
  params?: any;
  /**
   * @description 类名
   */
  className?: string;
  /**
   * @description 是否禁用form表单项
   */
  disabled?: boolean;
}

export interface ITableRef {
  /**
   * @description 手动触发 service 执行，参数会传递给 service
   */
  run(...params: any[]): void;
  /**
   * @description 刷新
   */
  refresh: (toFirstPage?: boolean) => void;
  /**
   * @description 当前table数据源
   */
  dataSource: any[];
  /**
   * @description 保留当前table筛选数据并跳转
   */
  navigateWithState: (to: To, options?: NavigateOptions | undefined) => void;
  /**
   * @description 提交
   */
  submit: () => void;
  /**
   * @description 筛选数据 第一项为分页数据，第二项为表单数据
   */
  dataRef: React.MutableRefObject<IParams | undefined>
  /**
   * @description 暴露出筛选Form组件实例，可用于设置筛选数据
   */
  form: FormInstance;
}
