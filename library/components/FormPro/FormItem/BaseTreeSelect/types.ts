import { IBaseItem } from '../../types';
import { TreeSelectProps } from 'antd';


// 输入框的字段
export interface ITreeSelectItem extends IBaseItem {
  /**
  * @description 表单项类型
  */
  type?: 'treeSelect';
  /**
  * @description 该属性会传给表单元素,例如 SelectTree
  */
  itemProps?: TreeSelectProps
}
