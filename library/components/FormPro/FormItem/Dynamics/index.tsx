import React from 'react';
import { Form, FormInstance } from 'antd';
import { IBaseItem } from '../../types';
import { NamePath } from '../../FormWrapper';
import styles from './index.module.less';
import { FormListFieldData } from 'antd/lib/form/FormList';

export interface IDynamicsProps extends IBaseItem{
  name: NamePath;
  /**
   * @description 单独指定表单项标签的宽度
   */
   labelWidth?: string,
  /**
  * @description 标签文本
  */
  label?: string;
  /**
  * @description 表单项类型
  */
   type?: 'dynamics';
  /**
  * @description 渲染动态表单项
  */
  renderFields: (field: FormListFieldData) => React.ReactNode;
   /**
   * @description 最多能添加的表单项个数
   */
    maxCount?: number,
    form?: FormInstance
  /**
   * @description 是否是预览模式；预览模式下没有操作按钮
   */
   isPreview?: boolean;
}

const Dynamics:React.FC<IDynamicsProps> = (props) => {
  const {
    name,
    renderFields,
    label,
    labelWidth,
    maxCount,
    formItemProps,
    isPreview = false
  } = props;

  return (
    <Form.Item
      label={label ? <div style={{width: labelWidth}}>{label}</div> : null}
      {...formItemProps}
    >
      <Form.List name={name}>
        {(fields, { add, remove }) => fields.map((field, idx) => (
          <div key={field.name} className={styles.row}>
            {renderFields(field)}
            {
              !isPreview
              && (maxCount === undefined || (maxCount && fields.length <= maxCount))
              && idx === 0
              && <i className={styles.addIcon} onClick={() => add()}/>
            }
            {
              !isPreview
              && fields.length > 1
              && <i className={styles.subIcon} onClick={() => remove(field.name)}/>
            }
          </div>
        ))
        }
      </Form.List>
    </Form.Item>

  );
};


export default Dynamics;
