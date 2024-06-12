import React, { useCallback } from 'react';
import { InputNumber, Input } from 'antd';
import styles from './index.module.less';
import withFormItem from '../../hoc/withFormItem';
import { IBaseRangeInputProps, InputValue } from './types';

export const BaseRangeInput: React.FC<IBaseRangeInputProps> = (props) => {
  const {
    className = '',
    precision,
    placeholder = [],
    value = [],
    prefix,
    suffix,
    max,
    min,
    onChange,
    onBlur,
    ...otherProps
  } = props;

  const onInputChange = useCallback((index: number, val: any) => {
    value[index] = val;
    onChange?.([ ...value ]);
  }, [ onChange, value ]);

  const onInputBlur = useCallback((index: number) => {
    let minVal = value[0];
    let maxVal = value[1];
    // 失去焦点时比较大小
    if (maxVal !== undefined && minVal !== undefined) {
      if (minVal > maxVal) {
        index === 0 ? minVal = maxVal : maxVal = minVal;
      }
    }
    const newValue: [InputValue, InputValue] = [ minVal, maxVal ];
    onChange?.(newValue);
    onBlur?.(newValue);
  }, [ onBlur, onChange, value ]);

  return (
    <Input.Group compact className={`${styles.rangeInput} ${className}`}>
      { prefix }
      <InputNumber
        {...otherProps}
        onBlur={() => onInputBlur(0)}
        onChange={(val) => onInputChange(0, val)}
        precision={precision}
        min={min}
        max={max}
        value={value[0]}
        className="inputLeft"
        placeholder={placeholder?.[0] || '最小值'}
      />
      <Input
        className="inputSplit"
        placeholder="~"
        disabled
      />
      <InputNumber
        {...otherProps}
        className="inputRight"
        placeholder={placeholder?.[1] || '最大值'}
        precision={precision}
        min={min}
        max={max}
        onBlur={() => onInputBlur(1)}
        onChange={(val) => onInputChange(1, val)}
        value={value[1]}
      />
      { suffix }
    </Input.Group>
  );
};

export default withFormItem(BaseRangeInput);
