import React, { useState } from 'react';
import { DatePicker } from 'antd';
import withFormItem from '../../hoc/withFormItem';
import {
  defaultDisabledDate,
  getDefaultFormat
} from './utils';
import { IBaseDateProps, IDateValue } from './types';
import dayjs from 'dayjs';
import { getPopupContainer } from '../utils';

const BaseDatePicker: React.FC<IBaseDateProps> = (props) => {
  const {
    itemProps,
    selectableDateRange,
    value,
    valueFormat,
    onChange,
    form,
    ...dateRestProps
  } = props;
  const [ date, setDate ] = useState<IDateValue>();
  const format = getDefaultFormat(itemProps);
  const handleValue = (val: IDateValue) => {
    setDate(val);
    if (onChange) {
      const date = val ? dayjs(val).format(valueFormat || format) : val;
      onChange(date);
    }
  };
  const getValue = () => {
    if (value) {
      return dayjs(value, format);
    }
    if (date) {
      return dayjs(date, format);
    }
    return null;
  };
  return (
    <DatePicker
      style={{ width: '100%' }}
      disabledDate={(current) => defaultDisabledDate(selectableDateRange, current)}
      getPopupContainer={getPopupContainer}
      value={ getValue() }
      onChange={((val) => handleValue(val as any))}
      {...itemProps}
      {...dateRestProps}
    />);
};
export default withFormItem(BaseDatePicker);
