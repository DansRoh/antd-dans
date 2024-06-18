import React, { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import withFormItem from '../../../hoc/withFormItem';
import {
  defaultDisabledDate,
  getDefaultFormat
} from '../utils';
import { IBaseRangeDateProps, IDateValue } from '../types';
import { getPopupContainer } from '../../utils';

const BaseRangePicker: React.FC<IBaseRangeDateProps> = (props) => {
  const {
    itemProps,
    selectableDateRange,
    value,
    valueFormat,
    onChange,
    fields,
    form,
    ...restProps
  } = props;
  const [ date, setDate ] = useState<IDateValue[] | null>();
  const format = getDefaultFormat(itemProps);
  const handleValue = (val: IDateValue[] | null) => {
    setDate(val);
    if (onChange) {
      if (val) {
        const [ start, end ] = val;
        const startValue = start ? dayjs(start).format(valueFormat || format) : null;
        const endValue = end ? dayjs(end).format(valueFormat || format) : null;
        val = [ start, end ];
        onChange([ startValue, endValue ]);
      } else {
        onChange(val);
      }
    }
  };
  const getValue: () => [Dayjs, Dayjs ] | null = () => {
    if (value) {
      const [ start, end ] = value;
      return [ dayjs(start), dayjs(end) ];
    }
    if (date) {
      const [ start, end ] = date;
      return [ dayjs(start), dayjs(end) ];
    }
    return null;
  };
  return (
    <DatePicker.RangePicker
      style={{ width: '100%' }}
      disabledDate={(current) => defaultDisabledDate(selectableDateRange, current)}
      getPopupContainer={getPopupContainer}
      value={ getValue() }
      onChange={((val) => handleValue(val as any))}
      {...itemProps}
      {...restProps}
    />);
};
export default withFormItem(BaseRangePicker);
