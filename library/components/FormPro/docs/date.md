---
title: 日期选择器
nav:
  title: 日期选择器
  order: 3
group:
  title: 表单
  path: '/components/form-pro/docs'
---
# 基本用法
该组件是基于antd的日期选择器的二次封装，默认情况下它会自动将存储到表单的值转成`YYYY-MM-DD`格式，你可以通过`valueFormat`修改这个格式
<code src="../demo/datePicker/BaseUsage.tsx"></code>

# 日期时间选择
组件会检测如果传递了`itemProps.format`,则默认采用itemProps.format的形式格式化存储到表单的值，同样你也可以通过`valueFormat`覆盖这个行为
<code src="../demo/datePicker/DateAndTimer.tsx"></code>

# 日期范围
通常情况下，后端都会要求我们传一个起始时间和结束时间，使用fields可以将name字段拆分两个字段。这样我们就不用在提交的时候再去处理数据了。

<code src="../demo/datePicker/DateRange.tsx"></code>

# 时间选择
<code src="../demo/datePicker/Timer.tsx"></code>

# 设置日期可选择的范围
使用selectableDateRange可设置日期可选择的范围，例如将属性的值设为`'beforeToday'`代表只能选择今天之前的日期，`beforeTodayAndToday`代表可以选择今天及之前的日期。更多属性值请查看API

<code src="../demo/datePicker/DateDisable.tsx"></code>

除此以外还可以传一个数组，例如`['2022-01-01', '2022-09-01']`可选择的日期范围就是2022-01-01～2022-09-01之间的时间；如果是 `[undefined, '2022-09-01']`,则可选择的范围是2022-09-01以及其之前的日期；如果是 `[2022-09-01]`,则是可以选择2022-09-01以及之后的日期。

<code src="../demo/datePicker/DateDisableRange.tsx"></code>

