import React from 'react';
import { IBaseRangeDateProps } from '../types';
import { IBaseRangeDateItem } from 'library/components/FormPro/types';
import DiscreteRangePicker from './DiscreteRangePicker';
import NormalRangePicker from './NormalRangePicker';

const BaseRangePicker: React.FC<IBaseRangeDateProps | IBaseRangeDateItem> = (props) => {
  const {
    fields,
  } = props;
  if (fields && fields.length === 2) {
    return <DiscreteRangePicker {...props as any} />;
  }
  return <NormalRangePicker {...props} />;
};
export default BaseRangePicker;
