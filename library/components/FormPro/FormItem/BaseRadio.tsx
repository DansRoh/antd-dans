import React from 'react';
import { Radio, RadioGroupProps } from 'antd';
import FormWrapper from '../FormWrapper';
import { IBaseItem } from '../types';


export interface IBaseRadioProps extends IBaseItem {
  /**
  * @description 标签文本
  */
  label?: string;
  /**
  * @description 表单项类型
  */
  type?: 'radio';
  itemProps?: RadioGroupProps;
}

const RadioInput = (props: IBaseRadioProps) => {
  const {
    formItemProps,
    itemProps,
    labelWidth,
    labelPosition,
    label,
    name,
    className,
  } = props;
  return (
    <FormWrapper
      {...formItemProps}
      labelWidth={labelWidth}
      labelPosition={labelPosition}
      name={name}
      label={label}
      className={className}
    >
      <Radio.Group {...itemProps}>
      </Radio.Group>
    </FormWrapper>
  );
};


export default RadioInput;
