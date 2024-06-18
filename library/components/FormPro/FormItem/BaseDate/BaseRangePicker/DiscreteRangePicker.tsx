import React from 'react';
import { DatePicker } from 'antd';
import {
  defaultDisabledDate,
} from '../utils';
import { IBaseRangeDateItem } from '../../../types';
import FormWrapper from '../../../FormWrapper';
import { getPopupContainer } from '../../utils';

const DiscreteRangePicker: React.FC<IBaseRangeDateItem> = (props) => {
  const {
    name,
    formItemProps,
    labelWidth,
    label,
    className,
    itemProps,
    selectableDateRange,
    valueFormat,
    fields,
    form,
    ...restProps
  } = props;
  if (!fields) {
    return null;
  }
  // const format = getDefaultFormat(itemProps);
  // const getValue: () => [Dayjs, Dayjs ] | null = () => {
  //   if (value) {
  //     const [ start, end ] = value;
  //     return [ dayjs(start), dayjs(end) ];
  //   }
  //   if (date) {
  //     const [ start, end ] = date;
  //     return [ dayjs(start), dayjs(end) ];
  //   }
  //   if (form?.getFieldValue(startKey) || form?.getFieldValue(endKey)) {
  //     return [ dayjs(form?.getFieldValue(startKey)), dayjs(form?.getFieldValue(endKey)) ];
  //   }
  //   return null;
  // };

  // const handleValue = (val: IValueType[] | null) => {
  //   setDate(val);
  //   if (val) {
  //     const [ start, end ] = val;
  //     const startValue = start ? dayjs(start).format(valueFormat || format) : null;
  //     const endValue = end ? dayjs(end).format(valueFormat || format) : null;
  //     form?.setFieldsValue({
  //       [startKey]: startValue,
  //       [endKey]: endValue
  //     });
  //   } else {
  //     form?.setFieldsValue({
  //       [startKey]: undefined,
  //       [endKey]: undefined
  //     });
  //   }
  // };
  return (
    <FormWrapper
      {...formItemProps}
      name={name}
      labelWidth={labelWidth}
      label={label}
      className={className}>
      <DatePicker.RangePicker
        style={{ width: '100%' }}
        disabledDate={(current) => defaultDisabledDate(selectableDateRange, current)}
        getPopupContainer={getPopupContainer}
        {...itemProps as any}
        {...restProps as any}
      />
    </FormWrapper>
  );
};
export default DiscreteRangePicker;
