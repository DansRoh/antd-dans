import {Form} from "antd";
import React from "react";
import {FormPro, IConfigItem} from "library/index";

export default {
  title: 'Example/Form',
  component: Form
}

const Template = () => {
  const [form] = Form.useForm()
  const items:IConfigItem[] = [
    {
      name: 'name',
      label: '姓名'
    },
    {
      name: 'sex',
      label: '性别',
      type: 'radio',
      itemProps: {
        options: ['男', '女']
      }
    },
    {
      name: 'age',
      label: '年龄',
      type: 'numberInput',
    }
  ]
  return (
    <Form form={form}>
      <FormPro
        gridLayout={{number: 3, gutter: 20}}
        config={items}
        form={form}
      ></FormPro>
    </Form>
  );
}

export const Base = Template.bind({});
