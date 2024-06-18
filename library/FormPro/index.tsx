import React from 'react';
import {Checkbox, Form, Input, Radio, Select} from 'antd'
import {FormProProps, ItemConfig} from "library/FormPro/types";
const FormItem = Form.Item
const { TextArea } = Input;

const FormPro = (props: FormProProps) => {
  const { items } = props

  const getActualInput = (item: ItemConfig) => {
    switch (item.type) {
      case "input":
        return Input;
      case "checkbox":
        return Checkbox;
      case "textarea":
        return TextArea;
      case "radio":
        return Radio;
      case "select":
        return Select;
      default:
        return Input
    }
  }

  const generateFormItems = (items: ItemConfig[]) => {
    return items.map(item => {
      const ActualInput = getActualInput(item)
      return (
        <FormItem key={item.name}>
          <ActualInput></ActualInput>
        </FormItem>
      )
    })
  }

  return (
    <>
      {
        generateFormItems(items)
      }
    </>
  );
};

export default FormPro;
