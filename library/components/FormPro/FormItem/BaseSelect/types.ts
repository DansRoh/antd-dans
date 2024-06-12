import React from 'react';
import { Service } from 'ahooks/lib/useRequest/src/types';
import { SelectProps } from 'antd';


interface IOptionObjItem {
  [propName: string]: string | number | boolean
}
export type IOptionItem = string | IOptionObjItem;
export interface ISelectProps {
   /**
  * @description 标签文本
  */
    label?: string;
  /**
 * @description 表单项类型
 */
  type?: 'select';
  /**
  
  /**
  * @description 选择框的下拉选项
  */
 options?: IOptionItem[];
  /**
  * @description 获取下拉选项的请求
  */
 request?: Service<any, any>;
  /**
  * @description 指定label的key值
  */
 labelKey?: string;
  /**
  * @description 指定value的key值
  */
 valueKey?: string;
  /**
  * @description 决定如何显示label
  */
 renderLabel?: (data: any) => React.ReactNode
  /**
  * @description 是否添加一个“全部”选项|
  */
 showAllOption?: boolean
 itemProps?: SelectProps
 value?: string
 onChange?: (val: string | undefined) => void
}
