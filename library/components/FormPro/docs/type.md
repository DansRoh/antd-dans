---
title: 类型设计说明
nav:
  title: 类型设计说明
  order: 2
group:
  title: 表单
  path: '/components/form-pro/docs'
---
```js
 const config = [
    {
      label: '姓名',
      name: 'name',
      type: 'input'
    },
    {
      label: '出生日期',
      name: 'date',
      type: 'date'
    },
    {
      label: '年龄',
      name: 'age',
      type: 'input'
    },
    {
      label: '学历',
      name: 'education',
      type: 'select',
      options: [
        {
          label: '大学',
          value: 'University'
        },
        {
          label: '小学',
          value: 'Primary'
        }
      ]
    },
  ];
```
config每一个项的属性既有传给Form.Item的属性，又有传给表单组件Input的和Select的属性，还有一些属性是自定义的，支持一些额外的功能。

Form.Item消费的属性
- name
- label
- formItemProps
- labelWidth

BaseInput，使我们基于input封装的组件，他消费的属性
- type
- label
- itemProps
- 以及Form.Item给子字节点注入的属性

Input消费的属性
- ...itemProps
- 以及Form.Item给字节点注入的属性

BaseSelect消费的属性，BaseSelect是Select的父组件
- options
- request
- labelKey
- renderLabel
- showAllOption
- itemProps
- 以及Form.Item给字节点注入的属性

Select，是antd提供的表单组件，他消费的属性
- ...itemProps
- 以及Form.Item给字节点注入的属性