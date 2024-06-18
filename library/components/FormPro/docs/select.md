---
title: 下拉选择框
nav:
  title: 下拉选择框
  order: 2
group:
  title: 表单
  path: '/components/form-pro/docs'
---

# 下拉选择框
### 基本用法
<code src="../demo/select/BaseUsage.jsx"></code>

### 指定选项label、value的key值
通过设置`labelKey`和`valueKey`指定选项label、value的key值

<code src="../demo/select/SelectKey.jsx"></code>

### 自定义选项的label
在某些场景下，选项的label需要拼接多个字段，此时可以通过`renderLabel`属性自定义label

<code src="../demo/select/SelectLabel.jsx"></code>

### 远程获取数据
设置`request`属性，可以自动发送请求，管理loading状态

<code src="../demo/select/SelectRequest.jsx"></code>
### 选项联动
一个常见的情景是选择一个下拉选择框的选项后，另外一个下拉选择框的选项会跟着变化。另外一个下拉选择框的选项有可能是从远程获取数据，也有可能是从关联下拉选择框的选项中获取数据。<br/>
#### 从远程获取
下面这个例子是从远程获取数据,使用useRequestOptions自定义hook可以来获取关联选择框的下拉选项。useRequestOptions会返回一个request，用来获取关联选择框的下拉选项。　request第一个参数可以是一个函数也可以是一个数组，如果第一个是一个函数，那第二个参数就是传给这个函数的参数。
<code src="../demo/select/SelectRequestRelate.jsx"></code>
#### 从关联选择的返回的数据获取
如果request第一个参数是一个数组，这个数组就是关联选择框的下拉选项。
<code src="../demo/select/SelectRequestLocal.jsx"></code>


     