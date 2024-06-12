import React from 'react';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import styles from './index.module.less';
import {
  ICustomColumnsProp,
  IShowTotal
} from './types';
import { IConfigItem } from '../FormPro/types';
import { getDefaultFormat } from '../FormPro/FormItem/BaseDate/utils';

/**
 * 判断value是否为空 （null, undefined, ""）
 * @param value 
 * @returns 
 */
const isEmpty = (value: any): boolean => {
  return value === null || value === undefined || value === '';
};

/**
 * 渲染总数
 * @param total 总数
 * @param showTotal 是否渲染
 * @returns 
 */
export const renderTotal = (total: number, showTotal?: IShowTotal) => {
  if (typeof showTotal === 'boolean' && showTotal === true) {
    return <div className={styles.font}>共<span>{total}</span>条</div>;
  }
  if (typeof showTotal === 'function') {
    return <div className={styles.font}>{showTotal(total)}</div>;
  }
  return null;
};

/**
 * 升级列表数据
 * @param columns 列表数据
 * @param nullDefaultValue 空值判断
 */
export const upgradeColumns = (columns: ICustomColumnsProp[], nullDefaultValue?: string): ICustomColumnsProp[] => {
  return columns.map((_item) => {
    const item = {..._item};
    const defaultValue = item.nullDefaultValue || nullDefaultValue || '--';
    if (item.children) {
      item.children = upgradeColumns(item.children, nullDefaultValue);
    }
    if (item.render) {
      return item;
    }
    if (item.dateFormat) {
      item.render = (columnData) => {
        return columnData ? dayjs(columnData).format(item.dateFormat) : columnData;
      };
      return item;
    }
    if (item.max) {
      item.render = (columnData) => {
        if (item.max) {
          if (columnData?.length > item.max) {
            return (
              <Tooltip title={columnData}>
                {columnData.substr(0, item.max)}...
              </Tooltip>
            );
          }
        }
        return isEmpty(columnData) ? defaultValue : columnData;
      };
      return item;
    }
    const { valueDict } = item;
    if (valueDict) {
      item.render = (columnData) => {
        const itemVal = Array.isArray(valueDict)
          ? valueDict?.find((row) => row.value === columnData)?.label
          : valueDict[columnData];
        return isEmpty(itemVal) ? defaultValue : itemVal;
      };
      return item;
    };
    item.render = (columnData) => !isEmpty(columnData) ? columnData : defaultValue;
    return item;
  });
};

/**
 * 将表单数据转换为提交数据
 * @param formData 表单数据
 * @param filterItems 筛选列表
 * @returns 
 */
export const formatFormDataToValues = (formData: {[x:string]: any}, filterItems: IConfigItem[] | undefined) => {
  const data: any = {...formData};
  filterItems?.map((item) => {
    const { fields, name = '', type, valueFormat, itemProps, join } = item as any;
    const itemValue = formData?.[name as string];

    if (isEmpty(itemValue)) {
      return '';
    }

    // 1. 处理存在fields字段的筛选项
    if (_.isArray(fields) && _.isArray(itemValue)) {
      fields.map((field: string, index: number) => {
        // 2. 日期区间格式化
        if (type === 'rangeDate') {
          const format = getDefaultFormat(itemProps);
          data[field] = itemValue[index]?.format(valueFormat || format);
          return;
        }
        data[field] = itemValue[index];
      });
      delete data[name as string];
    }
    // 2. 处理日期
    if (type === 'date' && valueFormat) {
      const format = getDefaultFormat(itemProps);
      data[name] = itemValue?.format(valueFormat || format);
    }
    if ( join !== undefined && Array.isArray(itemValue)) {
      data[name] = itemValue?.join(join);
    }
  });
  return data;
};

/**
 * 将提交数据转换为表单数据
 * @param values 提交数据
 * @param filterItems 筛选列表
 */
export const formatValuesToFormData = (values: {[x:string]: any}, filterItems: IConfigItem[] | undefined) => {
  const formData = {...values};
  filterItems?.map((item) => {
    const { fields, name = '', type, join } = item as any;
    const itemValue = formData?.[name];

    if (isEmpty(itemValue)) {
      return '';
    }

    // 1. 处理存在fields字段的筛选项
    if (_.isArray(fields)) {
      formData[name] = fields.map((field: string, index: number) => {
        const fieldVal = formData[field];
        delete formData[field];
        // 2. 日期区间格式化
        if (type === 'rangeDate') {
          return fieldVal ? dayjs(fieldVal) : undefined;
        }
        return fieldVal;
      });
      if (formData[name]?.filter((val) => val !== undefined).length === 0) {
        formData[name] = [];
      }
    }

    if (isEmpty(itemValue) && type === 'input') {
      return '';
    }

    // 2. 处理日期
    if (type === 'date') {
      formData[name] = dayjs(itemValue);
    }
    if ( join !== undefined && typeof (formData?.[name]) === 'string') {
      formData[name] = formData?.[name]?.split(join);
    }
  });
  return formData;
};


/**
 * 将后端的list数据格式进行统一转换
 * @param promise 请求promise
 */
export const formatResponseData = (promise: Promise<any>) => {
  return promise.then((res) => {
    return {
      list: res.content,
      total: res.page.total
    };
  });
};
