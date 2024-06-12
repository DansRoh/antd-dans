# 下载组件

基于antd的Button封装的下载组件，支持ButtonPro权限属性

支持一下功能：

1. 下载loading效果
2. 二进制文件下载
3. 支持下载文件重命名

## 调用方法

```jsx
import Download from 'library/components/Download';
import axios from 'axios';
import { message } from 'antd';


const App = () => {
  const error = true;

  // 普通下载示例
  const onDownload = () => {
    // 需要返回一个Promise对象，可自行配置请求参数等
    return axios.get('/api/downfile', { responseType: 'blob' })
  }

  // 下载拦截示例
  const onDownloadError = () => {
    if (error) {
      return Promise.reject('messgae报错提示!')
    }
    return axios.get('/api/downfile', { responseType: 'blob' })
  }

  return (
    <>
      <Download url='/api/download/开心.txt'>下载文件</Download>
      <Download onDownload={onDownload}>
        下载文件(自定义下载)
      </Download>

      <Download onDownload={onDownloadError}>
        下载文件(下载前拦截)
      </Download>
  	</>
  )
}

```


## API

| 参数         | 说明                                 | 类型                  | 默认值 |
| ------------ | ------------------------------------ | --------------------- | ------ |
| url          | 下载链接地址                         | `string`              | --     |
| onDownload   | 自定义下载事件                       | `() => Promise<Blob>` | --     |
| fileName     | 下载文件名，无则使用后端返回的文件名 | `string`              | --     |

其余参数与antd的Button组件、ButtonPro保持一致~