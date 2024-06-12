import React from 'react';
import { IGridLayoutProps } from '../GridLayout/index';
import {
  FormItemProps,
  FormInstance
} from 'antd';
import {
  IBaseInputProps,
  ITextAreaProps
} from './FormItem/BaseInput/types';
import { ISelectProps } from './FormItem/BaseSelect/types';
import { IFormItemProps } from './FormWrapper/index';
import { ITreeSelectItem } from './FormItem/BaseTreeSelect/types';
import { IBaseDateProps, IBaseRangeDateProps } from './FormItem/BaseDate/types';
import { IBaseCascaderProps } from './FormItem/BaseCascader/types';
import { IDynamicsProps } from './FormItem/Dynamics';
import { IBaseUploadProps } from './FormItem/BaseUpload/types';
import { IBaseRangeInputProps } from './FormItem/BaseRangeInput/types';
import { IBaseRadioProps } from './FormItem/BaseRadio';
import { IBaseCheckboxProps } from './FormItem/BaseCheckbox';
import { DescriptionsItemProType } from '../DescriptionsPro';
import { IBaseNumberInputProps } from './FormItem/NumberInput';
import { IBaseAutoCompleteProps } from './FormItem/BaseAutoComplete';

export type IFormGridLayout = Omit<IGridLayoutProps, 'children'>
// 各个表单项的基础字段
export interface IBaseItem extends Omit<IFormItemProps, 'children'> {
  /**
   * @description 决定表单项是否显示
   */
  show?: (values: any) => boolean;
  /**
   * @description 自定义渲染其他表单项
   */
  customRender?: (item: IBaseItem, index: number) => React.ReactNode;
  /**
  * @description 该属性会传给Form.Item
  */
  formItemProps?: FormItemProps,
  /**
   * @description 描述组件配置
   */
  descriptionItem?: Partial<DescriptionsItemProType>;
  /**
   * @description 是否独占一行
   * @default false
   */
  full?: boolean,
   /**
   * 用于处理Array数据: 提交: join拼接，回显split拆分；
   */
   join?: string;
}
export interface IInputItem extends IBaseInputProps, IBaseItem {
  type: 'input'
}
export interface ITextAreaItem extends ITextAreaProps, IBaseItem {
  type: 'textArea'
}
export interface ISelectItem extends ISelectProps, IBaseItem {
  type: 'select'
}
export interface IBaseDateItem extends IBaseDateProps, IBaseItem {
  type: 'date'
}

export interface IBaseAutoCompleteItem extends IBaseAutoCompleteProps, IBaseItem {
  type: 'autoComplete'
}

export interface IBaseRangeDateItem extends IBaseRangeDateProps, IBaseItem {
  type: 'rangeDate'
}
export interface IBaseCascaderItem extends IBaseCascaderProps, IBaseItem {
  type: 'cascader'
}

export interface IBaseRadioItem extends IBaseRadioProps, IBaseItem {
  type: 'radio'
}

export interface IBaseCheckboxItem extends IBaseCheckboxProps, IBaseItem {
  type: 'checkbox'
}

export interface IBaseUploadItem extends IBaseUploadProps, IBaseItem {
  type: 'upload',
}
export interface IDynamicsItem extends IDynamicsProps, Omit<IBaseItem, 'name'> {
  type: 'dynamics';
}

export interface IBaseRangeInputItem extends IBaseRangeInputProps, Omit<IBaseItem, 'name'> {
  type: 'rangeInput';
}

export interface IBaseNumberInput extends IBaseNumberInputProps, IBaseItem {
  type: 'numberInput'
}


export type ControlProps = IBaseInputProps | ITextAreaProps | ISelectProps | IBaseDateProps | IBaseRangeDateProps | IBaseCascaderProps | IBaseUploadProps | IBaseRangeInputProps

export type IConfigItem =
  IInputItem |
  ITextAreaItem |
  ISelectItem |
  IBaseDateItem |
  IBaseRangeDateItem |
  ITreeSelectItem |
  IBaseCascaderItem |
  IDynamicsItem |
  IBaseRangeInputItem |
  IBaseRadioItem |
  IBaseCheckboxItem |
  IBaseAutoCompleteItem |
  IBaseUploadItem |
  IBaseNumberInput;
export interface IFormProps {
  /**
   * @description 表单配置项
   */
  config: IConfigItem[]
  /**
   * @description 统一设置标签的宽度
   * @default 80px
   */
  labelWidth?: string;
  /**
   * @description label 定位位置
   */
  labelPosition?: 'left' | 'top';
  /**
 * @description 表单布局
 * @default
 *  {number: 2,  gutter: 20}
 */
  gridLayout?: IFormGridLayout;
  form: FormInstance;
  size?: string;
};

