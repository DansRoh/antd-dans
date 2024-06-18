import React from 'react';
import { TreeSelect } from 'antd';
import FormWrapper from '../../FormWrapper';
import { ITreeSelectItem } from './types';
import { getPopupContainer } from '../utils';

const BaseTreeSelect: React.FC<ITreeSelectItem> = (props) => {
  const {
    formItemProps,
    itemProps,
    labelWidth,
    label,
    name,
    className
  } = props;

  return (
    <FormWrapper
      {...formItemProps}
      labelWidth={labelWidth}
      name={name}
      label={label}
      className={className}
    >
      <TreeSelect
        placeholder={`请选择${label}`}
        getPopupContainer={getPopupContainer}
        {...itemProps}
      />
    </FormWrapper>
  );
};

export default BaseTreeSelect;
