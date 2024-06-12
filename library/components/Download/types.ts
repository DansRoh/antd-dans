import { IButtonProps } from '../ButtonPro/types';

export interface IDownloadProps extends IButtonProps {
  /**
   * @description 下载链接
   * @default --
   */
  url?: string;
  /**
   * @description 自定义下载，返回一个二进制Promise
   * @default --
   */
  onDownload?: (data?: any) => Promise<any>;
  /**
   * @description 下载请求data数据
   * @default --
   */
  data?: any;
  /**
   * @description 导出成功回调，一般用于刷新列表
   * @default --
   */
  onSuccess?: () => void;
  /**
   * @description 导入失败回调，一般无须处理
   * @default --
   */
  onError?: (err: any) => void;
  /**
   * @description 导出文件名称,需自带后缀名（不传采用后端返回文件名）
   * @default --
   */
  fileName?: string;
}
