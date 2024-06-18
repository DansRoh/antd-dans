import React, { useEffect } from 'react';
import { Cascader } from 'antd';
import { useRequest, useMount } from 'ahooks';
import FormWrapper from '../../FormWrapper';
import { IBaseCascaderProps } from './types';
import { getPopupContainer } from '../utils';

const BaseCascader: React.FC<IBaseCascaderProps> = (props) => {
  const {
    formItemProps,
    itemProps,
    labelWidth,
    labelPosition,
    label,
    name,
    className,
    request
  } = props;
  const options = itemProps?.options;
  const requestOpts = request || (() => Promise.resolve(options));
  const { data, run, loading } = useRequest(requestOpts, {
    manual: true
  });
  // 如果是传入的request,则只调用一次
  useMount(() => {
    if (request) {
      run();
    }
  });
  // 如果传入的是options，则在options属性更新后就调用
  useEffect(() => {
    if (!request) {
      run();
    }
  }, [ options, run, request ]);

  return (
    <FormWrapper
      {...formItemProps}
      labelWidth={labelWidth}
      labelPosition={labelPosition}
      name={name}
      label={label}
      className={className}
    >
      <Cascader
        placeholder={`请选择${label}`}
        loading={loading}
        options={data}
        getPopupContainer={getPopupContainer}
        {...itemProps}
      />
    </FormWrapper>
  );
};

export default BaseCascader;
