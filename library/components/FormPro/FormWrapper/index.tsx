import React from 'react';
import { Form, FormItemProps, } from 'antd';
import styles from './index.module.less';
import classNames from 'classnames';

export declare type InternalNamePath = (string | number)[];
export declare type NamePath = string | number | InternalNamePath;
export interface IFormItemProps {
  /**
 * @description 表单项字段值
 */
  name?: NamePath;
  /**
 * @description 标签文本
 */
  label?: string,
  /**
   * @description 单独指定表单项标签的宽度
   */
  labelWidth?: string,
  /**
   * @description label的位置
   * @default 'left'
   */
  labelPosition?: 'top' | 'left',
   /**
   * @description formItem样式
   */
  className?: string,
  children: React.ReactNode,
  size?: string;
}
const checkIsRequired = (rules: FormItemProps['rules']) => {
  let result = false;
  if (rules) {
    for (let rule of rules) {
      if ('required' in rule && rule.required) {
        result = true;
      }
    }
  }
  return result;
};
const FormItem: React.FC<IFormItemProps & FormItemProps> = (props) => {
  const {
    label,
    children,
    labelWidth,
    labelPosition = 'left',
    className,
    required,
    rules,
    size,
    ...remain
  } = props;

  const FormItem = Form.Item;
  const isRequired = required || checkIsRequired(rules);
  return (
    <FormItem
      {...remain}
      required={false}
      label={
        label ? (
          <div
            style={{width: labelPosition === 'left' ? labelWidth : undefined }}
            className={styles.label}
            data-size={size}
          ><span className={isRequired ? styles.required : ''}>{label}</span></div>
        )
          : null}
      className={classNames(className || '', styles[labelPosition])}
      rules={rules}
    >
      {children}
    </FormItem>
  );
};

export default FormItem;
