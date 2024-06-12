---
title: 配置型表单(FormPro)
nav:
  title: 配置型表单(FormPro)
  order: 1
group:
  title: 表单
  path: '/components/form-pro/docs'
---

# 配置型表单(FormPro)
对于一些简单的表单，可以使用此组件快速构建一个表单。
## 基本使用
<code src="../demo/BaseForm/index.tsx"></code>
## 表单项联动
有一种需求是当选择某一个选项时隐藏另一些表单项。实现这个功能的关键点是使用useWatch获取到变化的值，然后设置关联表单项的show属性。
<code src="../demo/DynamicForm/index.tsx"></code>

## 下拉选择框
<code src="../demo/select/BaseUsage.jsx"></code>
更多示例请查看[此处](/components/form-pro/docs/select)

## 日期选择
<code src="../demo/datePicker/BaseUsage.tsx"></code>
更多示例请查看[此处](components/form-pro/docs/date)

## API
| 属性 | 说明 | 类型 | 默认值 |
| :--: | :--: | :--:  | :--:  |
|config|表单配置项|`IConfigItem[]`|`(必选)`|
|labelWidth|统一设置标签的宽度|`string`|`80px`|
|gridLayout|表单布局|`IFormGridLayout`|`{ number: 2, gutter: 20 }` |

### IConfigItem
IConfigItem是一个表单项的配置,以下是一些公共属性
| 属性 | 说明 | 类型 | 默认值 |
| :--: | :--: | :--:  | :--:  |
|type|表单项的类型|`'input' \| 'textArea' \| 'select' \| 'date' \|'rangeDate'`| - |- |
|name|表单项字段值|`string\| number \| (string \| number\)[]` ||-|
|label|标签文本| `React.ReactNode` |- |
|itemProps|该属性会传给表单元素,例如Input, Select| - |- |
|formItemProps|该属性会传给Form.Item| - |- |
|show|决定表单项是否显示|`()=> boolean`|-|

### type='select',表单项为下拉选择框时特有的属性
| 属性 | 说明 | 类型 | 默认值 |
| :--: | :--: | :--:  | :--:  |
|options|选择框的下拉选项| `string[] \| Option[]` |- |
|request|获取下拉选项的请求|`Promise`|-|
|labelKey|指定label的key值| `string` |`label` |
|valueKey|指定value的key值| `string` |`value`|
|renderLabel|决定如何显示label| `(data) => string\|React Node` |-|
|showAllOption|是否添加一个“全部”选项|`boolean`|`false`|

### type='date',表单项为日期选择框特有的属性
| 属性 | 说明 | 类型 | 默认值 |
| :--: | :--: | :--:  | :--:  |
|valueFormat|用于格式化存储到表单的值| `string` |默认是`itemProps.format`的值，如果没有则是antd的默认format的值|
|selectableDateRange|指定可选择的日期范围|`'beforeToday'`\|`'beforeTodayAndToday'`\|`'afterToday'`\|`'afterTodayAndTody'`|`'[string]'`|`'[string\|undefined, string\| undefined]’`|-|

### type='dateRange',表单项为日期范围特有的属性
| 属性 | 说明 | 类型 | 默认值 |
| :--: | :--: | :--:  | :--:  |
|valueFormat|用于格式化存储到表单的值| `string` |默认是`itemProps.format`的值，如果没有则是antd的默认format的值|
|selectableDateRange|指定可选择的日期范围|`'beforeToday'`\|`'beforeTodayAndToday'`\|`'afterToday'`\|`'afterTodayAndTody'`|`'[string]'`|`'[string\|undefined, string\| undefined]’`|-|
|fields|用于将时间范围的值拆分成两个字段|`[string, string]`|-|
