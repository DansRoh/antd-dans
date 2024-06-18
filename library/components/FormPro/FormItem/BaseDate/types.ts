import { ComponentProps } from 'react';
import { DatePicker, FormInstance } from 'antd';
import { Dayjs } from 'dayjs';

export type ISelectableDateRange = 'beforeToday' | 'beforeTodayAndToday' | 'afterToday' | 'afterTodayAndTody' | [ string ] | [string | undefined, string ] | undefined
export interface IDateCommonProps {
  valueFormat?: string;
  selectableDateRange?: ISelectableDateRange;
  form?: FormInstance
}
export interface IBaseDateProps extends IDateCommonProps {
  type?: 'date';
  itemProps?: ComponentProps<typeof DatePicker>;
  value?: Dayjs | string;
  onChange?: (val: string | null) => void
}

export type IDateValue = string | null

export interface IBaseRangeDateProps extends IDateCommonProps {
  type?: 'rangeDate';
  itemProps?: ComponentProps<typeof DatePicker.RangePicker>;
  fields?: [string, string];
  onChange?: (val: any) => void;
  value?: any;
}

