import {Form} from "antd";
import React from "react";
import FormPro from "../library/FormPro";
import {ItemConfig} from "../library/FormPro/types";

export default {
  title: 'Example/Form',
  component: Form
}

const Template = ({items}) => {
  return (
    <Form>
      <FormPro items={items}></FormPro>
    </Form>
  );
}

export const Base = Template.bind({});
// @ts-ignore
Base.args = {
  items: [
    { name: 'name', label: '姓名', type: 'input' },
    { name: 'pwd', label: '密码', type: 'input' },
  ]
}
