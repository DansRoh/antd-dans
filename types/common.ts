import { FormInstance } from 'antd';

/** 公共form实例接口 */
export interface IFormRef {
  /**
   * @description 经 Form.useForm() 创建的 form 控制实例
   */
  form: FormInstance<any>;
  /**
   * @description 触发表单验证validateFields，校验成功后返回值values
   */
  getValues: () => Promise<{ [x: string]: any }>;
}
