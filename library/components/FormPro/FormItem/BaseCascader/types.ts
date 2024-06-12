/* eslint-disable quotes */
import { IBaseItem } from "../../types";
import { CascaderProps } from "antd";
import { Service } from "ahooks/lib/useRequest/src/types";

// 输入框的字段
export interface IBaseCascaderProps extends IBaseItem {
  /**
   * @description 表单项类型
   */
  type?: "cascader";
  /**
   * @description 该属性会传给表单元素,例如 SelectTree
   */
  fields?: string[];
  /**
   * @description 该属性会传给表单元素,例如 SelectTree
   */
  itemProps?: CascaderProps<any>;
  /**
   * @description 获取下拉选项的请求
   */
  request?: Service<any, any>;
}
