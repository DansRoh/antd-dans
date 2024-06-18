import React from 'react';
import FormWrapper from '../FormWrapper';
import { ControlProps, IBaseItem } from '../types';

export type UnionComponent<T> = T extends any ? React.FC<T> : never

export default function withFormItem<T extends ControlProps>(Component: React.FC<T>): React.FC<T & IBaseItem> {
  return (props) => {
    const {
      name,
      label,
      labelWidth,
      labelPosition,
      className,
      show,
      size,
      customRender,
      formItemProps,
      full,
      ...controlProps
    } = props;
    const componentProps = {
      label,
      name,
      ...controlProps
    } as T;
    return (
      <FormWrapper
        {...formItemProps}
        labelWidth={labelWidth}
        labelPosition={labelPosition}
        size={size}
        label={label}
        name={name}
        className={className}>
        <Component {...componentProps }/>
      </FormWrapper>
    );
  };
}
