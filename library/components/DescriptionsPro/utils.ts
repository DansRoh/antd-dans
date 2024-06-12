import { DescriptionsProItem } from '.';

/**
 * 将FormPro.config配置转换为DescriptionsPro.items配置
 * @param config 与 FormPro.config 属性一致
 * @param transform 是否转换
 * @returns 
 */
export const transformFormProConfig = (config: any[], transform = true ): DescriptionsProItem[] => {
  if (!transform) {
    return config;
  }
  return config?.map((item) => {
    const { itemProps, labelKey, valueKey, fields } = item;
    const row = {
      render: fields ? (val, data) => {
        return fields.map((field) => data?.[field])
          .filter((field) => field !== undefined && field !== null)
          .join('/') || '--';
      } : undefined,
      ...item,
      ...item.descriptionItem,
      key: item.name || item.key || item.label,
      valueDict: (item.options || itemProps?.options)?.map((item) => {
        if (labelKey || valueKey) {
          return { label: item[labelKey], value: item[valueKey]};
        }
        return item;
      }),
    };
    return row;
  });
};
