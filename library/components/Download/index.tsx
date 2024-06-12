import React, { useCallback, useState } from 'react';
import axios from 'axios';
import ButtonPro from '../ButtonPro';
import { IDownloadProps } from './types';
import { download } from 'library/utils';


/** 下载导出组件 */
export const Download: React.FC<IDownloadProps> = (props) => {
  const { url, onDownload, onSuccess, onError, fileName, children, data, ...other } = props;

  const [ loading, setLoading ] = useState(false);

  const handleClick = useCallback(() => {
    if (!url && !onDownload) {
      throw new Error('下载链接url 和自定义下载函数onDownload必须有一个');
    }

    if (typeof onDownload !== 'function' && !url) {
      throw new Error('onDownload必须一个函数，且返回一个promise 对象');
    }
    let downFileName = fileName;
    const promise = url ? axios.get(url, { responseType: 'blob', data, }) : onDownload!(data);
    setLoading(true);
    promise
      .then((response) => {
        if (response.status !== 200) {
          return;
        }
        if (!fileName) {
          try {
            // 尝试解析content-disposition 后端必须配置
            const contentDisp = response.headers['content-disposition'];
            let fileNameArr = [] as any;
            if (contentDisp.indexOf('filename*=') >= 0) {
              fileNameArr = contentDisp.split('filename*=');
            } else {
              fileNameArr = contentDisp.split('filename=');
            }
            if (fileNameArr[1]) {
              fileNameArr[1] = fileNameArr[1].replace(/'|"/g, ''); // 替换火狐浏览器中，无法识别的包含空格文件名，把文本空格替换为编码空格
              fileNameArr[1] = fileNameArr[1].replace(' ', '%20');
              downFileName = decodeURIComponent(fileNameArr[1]);
            }
          } catch (error) {
            console.error(error);
          }
        }

        if (!downFileName) {
          downFileName = '未知文件';
        }

        const blob = new Blob([ response.data ]); // 创建Blob实例
        download(blob, downFileName);
        onSuccess?.();
      })
      .catch((err) => {
        onError?.(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ url, onDownload, fileName, data, onSuccess, onError ]);

  return (
    <ButtonPro loading={loading || other.loading} {...other} onClick={handleClick}>
      {children}
    </ButtonPro>
  );
};

export default Download;
