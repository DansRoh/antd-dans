import React from 'react';
import { IBaseDateItem, IBaseRangeDateItem } from '../../types';
import BaseDatePicker from './BaseDatePicker';
import BaseRangePicker from './BaseRangePicker';


const BaseDate: React.FC<IBaseDateItem | IBaseRangeDateItem> = (props) => {
  const {
    type,
  } = props;
  if (type === 'rangeDate') {
    return <BaseRangePicker {...props} />;
  }
  return <BaseDatePicker {...props} />;
};

export default BaseDate;
