import React from 'react';
import {
  InputProps,
} from 'antd';
import { TextAreaProps } from 'antd/lib/input/TextArea';

type IValue = string | number | readonly string[] | undefined;
interface IInputItemProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: IValue | undefined, evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => void;
}
interface ITextAreaItemProps extends Omit<TextAreaProps, 'onChange'> {
  onChange?: (value: IValue | undefined, evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => void;
}
// 输入框的字段
export interface IBaseInputProps{
  /**
  * @description 标签文本
  */
  label?: string;
  /**
  * @description 表单项类型
  */
   type?: 'input';
  /**
  * @description 该属性会传给表单元素,例如Input, Select
  */
  itemProps?: IInputItemProps;
  /**
  * @description input后置元素
  */
  suffixSlot?: React.ReactNode;
  /**
  * @description 值
  */
   value?: IValue;
     /**
  * @description 值变化的事件
  */
  onChange?: (value: IValue | undefined, evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => void;
}
// TextArea字段
export interface ITextAreaProps {
  label?: string;
  /**
  * @description 表单项类型
  */
  type: 'textArea';
  /**
   * @description 该属性会传给表单元素,例如Input, Select
   */
  itemProps?: ITextAreaItemProps,
   /**
  * @description input后置元素
  */
    suffixSlot?: React.ReactNode;
    /**
  * @description 值
  */
   value?: string | number;
   /**
* @description 值变化的事件
*/
onChange?: (value: IValue | undefined, evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => void;
}
