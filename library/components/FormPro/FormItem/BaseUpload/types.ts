import { UploadProps } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';


// fileType对应的accept映射（相当一个快捷的accept属性），后期可根据实际需求扩展
export const FILE_TYPE_MAP = {
  image: 'image/*',
  video: 'video/*',
  audio: 'audio/*',
  json: 'application/json',
  pdf: 'application/pdf',
  doc: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  word: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: '.ppt, .pptx',
  zip: '.zip'
};

export type IFileType = keyof typeof FILE_TYPE_MAP;


export interface IBaseUploadProps extends Omit<UploadProps, 'onChange' | 'type' | 'name'> {
  type?: 'upload';
  /**
   * @description 允许上传的最大文件数量
   */
  maxCount?: number;
  /**
   * @description 是否禁用
   */
  disabled?: boolean;
  /**
   * @description 文案提示
   */
  tip?: string;
  /**
   * @description 表单值
   */
  value?: UploadFile[];
  /**
   * @description 允许上传的最大字节
   */
  maxSize?: number;
  /**
   * @description 超过最大允许上传字节的提示文案，不存在则使用tip
   * @default 请上传大小不超过*M的文件
   */
  maxSizeTip?: string;
  /**
   * @description 允许上传的文件类型，accept一个语法糖
   */
  fileType?: IFileType | IFileType[];
  /**
   * @description 不支持的文件类型提示文案，不存在则使用tip
   */
  fileTypeTip?: string;
  /**
   * @description 是否是拖拽组件Dragger
   * @default false
   */
  dragger?: boolean;
  /**
   * @description 是否手动上传，true设为手动上传
   * @default false
   */
  manual?: boolean;
  /**
   * @description onChange回调函数配合Form.Item,默认不需要手动传入
   */
  onChange?: (filesList: UploadFile[]) => void;
  /**
   * @description 文件上传完成回调，常用于Form表单验证（上传中禁止提交）
   */
  onFinish?: (filesList: UploadFile[]) => void;
  itemProps?: UploadProps;
}
