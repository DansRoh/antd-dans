import React, { memo } from 'react';
import { Input, Space } from 'antd';
import styles from './index.module.less';
import withFormItem from '../../hoc/withFormItem';
// import FormWrapper from '../../FormWrapper';
import {
  IBaseInputProps,
  ITextAreaProps
} from './types';

const BaseInput: React.FC<IBaseInputProps | ITextAreaProps> = (props) => {
  const {
    type,
    itemProps,
    label,
    suffixSlot,
    value,
    onChange,
    ...restProps
  } = props;
  const { TextArea } = Input;
  const { onChange: customOnChange } = itemProps || {};
  const proxyOnChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (customOnChange) {
      customOnChange(evt.target.value, evt);
    }
    if (onChange) {
      onChange(evt.target.value, evt);
    }
  };
  const handleInputType = () => {
    let textareaProps = {};
    if (itemProps) {
      const { onChange, ...remainItemProps } = itemProps || {};
      textareaProps = {...remainItemProps};
    }
    if (type === 'textArea') {
      return (
        <Space style={{width: '100%'}}>
          <TextArea
            placeholder={`请输入${label}`}
            value={value}
            {...textareaProps}
            {...restProps}
            onChange={(evt) => proxyOnChange(evt)}
          />
          {suffixSlot}
        </Space>
      );
    }
    let inputProps = {};
    if (itemProps) {
      const { onChange, ...remainItemProps } = itemProps || {};
      inputProps = {...remainItemProps};
    }
    return (
      <Space style={{width: '100%'}}>
        <Input
          style={{width: '100%'}}
          placeholder={`请输入${label}`}
          value={value}
          {...inputProps}
          {...restProps}
          onChange={(evt) => proxyOnChange(evt)}
        />
        {suffixSlot}
      </Space>

    );
  };
  return (
    <div className={styles.space}>
      {handleInputType()}
    </div>
  );
};

export default withFormItem(memo(BaseInput));
