import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/es/input-number';
import { IBaseItem } from '../types';
import FormWrapper from '../FormWrapper';
import React from 'react';

export interface IBaseNumberInputProps extends IBaseItem {
  /**
  * @description 标签文本
  */
  label?: string;
  /**
  * @description 表单项类型
  */
  type?: 'numberInput';
  itemProps?: InputNumberProps;
}

const NumberInput = (props: any) => {
  const {
    formItemProps,
    itemProps,
    labelWidth,
    labelPosition,
    label,
    name,
    className,
    value,
    onChange,
  } = props;

  const handleChange = (val: string) => {
    if (itemProps && itemProps.onChange) {
      itemProps?.onChange(val);
    }
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <FormWrapper
      {...formItemProps}
      labelWidth={labelWidth}
      labelPosition={labelPosition}
      name={name}
      label={label}
      className={className}
    >
      <InputNumber
        style={{ width: '100%' }}
        placeholder={`请输入${label}`}
        value={value}
        onChange={handleChange}
        {...itemProps}
      />
    </FormWrapper>
  );
};

export default NumberInput;
