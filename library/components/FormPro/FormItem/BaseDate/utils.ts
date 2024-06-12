import dayjs, { Dayjs } from 'dayjs';
import {
  ISelectableDateRange,
  IBaseRangeDateProps,
  IBaseDateProps
} from './types';

export function defaultDisabledDate (disableType: ISelectableDateRange, current: Dayjs) {
  if (disableType === 'beforeToday') {
    return current && current > dayjs().startOf('day');
  }
  if (disableType === 'beforeTodayAndToday') {
    return current && current > dayjs().endOf('day');
  }
  if (disableType === 'afterToday') {
    return current && current < dayjs().endOf('day');
  }
  if (disableType === 'afterTodayAndTody') {
    return current < dayjs().startOf('day');
  }
  if (Array.isArray(disableType)) {
    const [ start, end ] = disableType;
    if (start && end && dayjs(start).isValid() && dayjs(end).isValid()) {
      return current < dayjs(start).startOf('day') || current > dayjs(end).endOf('day');
    }
    if (start && dayjs(start).isValid()) {
      return current < dayjs(start).startOf('day');
    }
    if (end && dayjs(end).isValid()) {
      return current > dayjs(end).endOf('day');
    }
    return true;
  }
  return false;
};
export function getDefaultFormat(itemProps: IBaseRangeDateProps['itemProps'] | IBaseDateProps['itemProps']) {
  let defaultFormat = 'YYYY-MM-DD';
  if (itemProps) {
    if ('picker' in itemProps) {
      switch (itemProps.picker) {
        case 'year':
          defaultFormat = 'YYYY';
          break;
        case 'month':
          defaultFormat = 'YYYY-MM';
          break;
        case 'week':
          defaultFormat = 'YYYY-wo';
          break;
        case 'time':
          defaultFormat = 'HH:mm:ss';
          break;
        case 'quarter':
          defaultFormat = 'YYYY-QQ';
          break;
      }
    }
  }
  return itemProps?.format as string || defaultFormat;
}
