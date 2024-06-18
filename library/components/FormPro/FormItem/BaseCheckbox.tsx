import React from 'react';
import { Checkbox } from 'antd';
import FormWrapper from '../FormWrapper';
import { IBaseItem } from '../types';
import { CheckboxGroupProps } from 'antd/es/checkbox';


export interface IBaseCheckboxProps extends IBaseItem {
  /**
  * @description 标签文本
  */
  label?: string;
  /**
  * @description 表单项类型
  */
  type?: 'checkbox';
  itemProps?: CheckboxGroupProps;
}

const BaseCheckbox = (props: IBaseCheckboxProps) => {
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
      <Checkbox.Group {...itemProps}>
      </Checkbox.Group>
    </FormWrapper>
  );
};


export default BaseCheckbox;
