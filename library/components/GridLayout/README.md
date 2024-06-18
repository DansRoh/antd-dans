# 布局组件（GridLayout）
一个简单的布局组件，常用于在一行需要展示固定个数的元素。实现了justify-content: space-between;的布局效果，但是解决了当最后一行数量不足的错位布局。
## 基本使用
此组件基本使用是设置一行需要展示的个数number和元素之前的间距gutter。这样GridLayout会根据这两个参数自动计算每个元素的宽度，不需要我们再手动设置。
<code src="./demo/BaseLayout/index.jsx"></code>
## 列表筛选
另外一个常见的用法是用在表单和列表的筛选上。对于筛选组件来说，除了设置gutter和number，还需要将autoExtend设置为true,这样最后一项操作栏会始终占满最后一行的剩余空间
<code src="./demo/FilterLayout/index.jsx"></code>
## GridLayout.Full
GridLayout.Full可以让某一项独占一行。
<code src="./demo/FormLayout/index.jsx"></code>

<API src="./index.tsx"></API>
## 注意事项
### GridLayout.Full和autoExtend的区别
GridLayout.Full是可以指定任意项独占一行。而autoExtend是让最后一项自动填充剩余的空间，例如没一行指定显示4个元素，最后一行有两个元素，如果设置autoExtend为true，那最后一项的宽度是剩余三个元素的宽度。