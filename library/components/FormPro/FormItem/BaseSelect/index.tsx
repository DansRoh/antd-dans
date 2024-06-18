import React, { useEffect } from 'react';
import { Select } from 'antd';
import { useRequest, useMount } from 'ahooks';
import withFormItem from '../../hoc/withFormItem';
import { ISelectProps, IOptionItem } from './types';
import { getPopupContainer } from '../utils';

const SelectInput: React.FC<ISelectProps> = (props) => {
  const Option = Select.Option;
  const {
    labelKey = 'label',
    valueKey = 'value',
    renderLabel,
    request,
    options,
    showAllOption = false,
    label,
    itemProps,
    value,
    onChange,
    ...restProps
  } = props;
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
  const createOptions = (options: IOptionItem[]) => {
    if (!options || options.length === 0) {
      return undefined;
    }
    const output: any[] = [];
    if (showAllOption) {
      output.push(
        <Option
          key="all"
          value=""
        >
          全部
        </Option>
      );
    }
    options.map((opt, index) => {
      if (typeof opt === 'object') {
        output.push(
          <Option
            key={index}
            value={opt[valueKey]}
            data={opt}
          >
            { renderLabel ? renderLabel(opt) : opt[labelKey]}
          </Option>
        );
      } else {
        output.push(<Option key={index} value={opt} data={opt}>{opt}</Option>);
      }
    });
    return output;
  };
  const handleChange = (val: string) => {
    if (itemProps && itemProps.onChange) {
      itemProps?.onChange(val, data);
    }
    if (onChange) {
      onChange(val);
    }
  };
  return (
    <Select
      loading={loading}
      placeholder={`请选择${label}`}
      getPopupContainer={getPopupContainer}
      value = {value}
      onChange={handleChange}
      {...itemProps}
      {...restProps}
    >
      {createOptions(data || [])}
    </Select>
  );
};

export default withFormItem(SelectInput);
