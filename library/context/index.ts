import { UploadProps } from 'antd';
import React from 'react';

export interface IConfig {
  permissionData?: any;
  checkPermission?: (data: any, code: any) => boolean;
  /**
   * 上传组件的一些默认配置
   */
  upload?: UploadProps;
}

export const configContext = React.createContext<IConfig>({});
export const ConfigProvider = configContext.Provider;
