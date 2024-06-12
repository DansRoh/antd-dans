import { InputNumberProps } from 'antd';
import React from 'react';

export type InputValue = undefined | number

export type RangeInputValue = [InputValue, InputValue] | undefined | [];

export interface IBaseRangeInputProps extends Omit<InputNumberProps, 'onChange' | 'value' | 'placeholder' | 'onBlur' | 'onChange' | 'size'> {
  type?: 'rangeInput';
  /**
   * @description 类名
   */
  className?: string;
  /**
   * @description 数值精度，配置 formatter 时会以 formatter 为准
   */
  precision?: number;
  /**
   * @description input占位符
   */
  placeholder?: [string, string];
  /**
   * @description 字段键值对，用于提交时将value转换为对应的2个字段
   */
  fields?: [string, string];
  /**
   * @description 带有前缀图标的 input
   */
  prefix?: React.ReactNode;
  /**
   * @description 带有后缀图标的 input
   */
  suffix?: React.ReactNode;
  /**
   * @description 最大值
   */
  max?: number;
  /**
   * @description 最小值
   */
  min?: number;
  /**
   * @description 值
   */
  value?: RangeInputValue;
  /**
   * @description 变化回调
   */
  onChange?: (value: RangeInputValue) => void;
  /**
   * @description 失去焦点回调
   */
  onBlur?: (value: RangeInputValue) => void;
}
