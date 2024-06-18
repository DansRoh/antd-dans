import { Descriptions, Spin, TableColumnsType } from 'antd';
import React, { FC, useMemo } from 'react';
import { Service } from 'ahooks/lib/useRequest/src/types';
import { useRequest } from 'ahooks';
import { DescriptionsItemType } from 'antd/es/descriptions';
import { DescriptionsProps } from 'antd/lib';
import { transformFormProConfig } from './utils';
import { IConfigItem } from '../FormPro/types';

export interface DescriptionsProItem extends DescriptionsItemType, TableColumnsType {
  key: string;
  type?: string; // 参数待定，预留
  render?: (value: any, data: any, index: number) => any;
  valueDict?: { value: string, label: any }[];
  show?: (data?: any) => boolean;
  title?: string;
  dataIndex?: string;
}

export type DescriptionsItemProType = DescriptionsProItem | IConfigItem;

interface IDescriptionsProProps extends Omit<DescriptionsProps, 'items'> {
  /**
   * @description 与tablePro.columns配置一致，也可支持formPro.config配置，但需要将transform设置为true
   */
  items: DescriptionsItemProType[];
  /**
   * @description 默认是用tablePro.columns列表配置项，如果用的是formPro.config的配置项，则此参数传true，可支持formPro的配置项
   * @default true
   */
  transform?: boolean;
  /**
   * @description 详情接口，data优先级更高
   */
  request?: Service<any, any>;
  /**
   * @description 刷新接口依赖
   */
  refreshDeps?: React.DependencyList;
  /**
   * @description 详情数据
   */
  data?: any;
}


const DescriptionsPro: FC<IDescriptionsProProps> = (props) => {
  const { transform = true, items, request, refreshDeps, ...other } = props;
  const { data: reqData, loading } = useRequest(request!, { manual: !request, refreshDeps });
  const currentData = props.data || reqData;

  const _items = useMemo(() => {
    return transformFormProConfig(items, transform)?.filter((item) => {
      const { show } = item;
      if (!show) return true;
      const res = show( currentData);
      return res;
    })?.map((item, index) => {
      const { valueDict, key, dataIndex, render } = item;
      const value = currentData?.[key || dataIndex!];
      let children = value;

      if (Array.isArray(valueDict)) {
        children = valueDict.find((opt) => opt.value === value)?.label || value;
      }

      if (render) {
        children = render?.(value, currentData || {}, index);
      }

      return {
        ...item,
        key,
        label: item.label || item.title,
        children: children ?? '--',
      };
    });

  }, [ currentData, items, transform ]);

  return (
    <Spin spinning={loading}>
      <Descriptions {...other} items={_items} />
    </Spin>
  );
};

export default DescriptionsPro;
