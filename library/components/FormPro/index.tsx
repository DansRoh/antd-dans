import React, { memo } from 'react';
import {
  BaseInput,
  BaseDate,
  BaseSelect,
  BaseRadio,
  BaseCheckbox,
  NumberInput,
  BaseTreeSelect,
  BaseCascader,
  Dynamics,
  BaseUpload,
  BaseRangeInput,
  BaseAutoComplete,
} from './FormItem';
import GridLayout from '../GridLayout';
import FormWrapper from './FormWrapper';
import {
  IFormProps,
  IConfigItem,
} from './types';

export const FormPro: React.FC<IFormProps> = memo(({
  config,
  labelWidth: formLabelWidth = '80px',
  labelPosition: formLabelPosition,
  gridLayout = {
    number: 2,
    gutter: 20
  },
  size,
  form
}) => {
  const handleInputItem = (item: IConfigItem, idx: number) => {
    const labelWidth = item.labelWidth || formLabelWidth;
    const labelPosition = item.labelPosition || formLabelPosition;
    let ItemFile: React.FC<any> = BaseInput;
    const { descriptionItem, ...otherItem} = item;
    switch (item.type) {
      case 'input':
      case 'textArea':
        ItemFile = BaseInput;
        break;
      case 'date':
      case 'rangeDate':
        ItemFile = BaseDate;
        break;
      case 'select':
        ItemFile = BaseSelect;
        break;
      case 'treeSelect':
        ItemFile = BaseTreeSelect;
        break;
      case 'cascader':
        ItemFile = BaseCascader;
        break;
      case 'dynamics':
        ItemFile = Dynamics;
        break;
      case 'upload':
        ItemFile = BaseUpload;
        break;
      case 'rangeInput':
        ItemFile = BaseRangeInput;
        break;
      case 'radio':
        ItemFile = BaseRadio;
        break;
      case 'checkbox':
        ItemFile = BaseCheckbox;
        break;
      case 'numberInput':
        ItemFile = NumberInput;
        break;
      case 'autoComplete':
        ItemFile = BaseAutoComplete;
        break;
      default:
        break;
    }
    return <ItemFile {...otherItem} labelWidth={labelWidth} labelPosition={labelPosition} size={size} key={idx} form={form} />;
  };
  const createFormItem = (config: IConfigItem[]) => {
    if (!config || config.length === 0) {
      return null;
    }
    const output: React.ReactNode[] = [];
    const values = form?.getFieldsValue();
    config.map((item, idx) => {
      const { name } = item;
      const isShow = item.show ? item.show(values) : true;
      const key = Array.isArray(name) ? name.join('-') : (name || idx);
      let element;
      if (item.customRender && isShow) {
        item.labelWidth = item?.labelWidth || formLabelWidth;
        const { customRender, ...otherItem } = item;
        element = (<React.Fragment key={key}>{item.customRender(otherItem, idx)}</React.Fragment>);
      } else if (isShow) {
        element = (handleInputItem(item, idx));
      }
      if (item.full) {
        output.push(<GridLayout.Full key={key}>{element}</GridLayout.Full>);
        return;
      }
      output.push(element);
    });
    return output;
  };
  return (
    <GridLayout
      {...gridLayout}>
      {createFormItem(config)}
    </GridLayout>
  );
});
export {
  FormWrapper,
  BaseInput,
  BaseDate,
  BaseSelect,
  BaseRadio,
  BaseCheckbox,
  NumberInput,
  BaseTreeSelect
};

export default FormPro;
