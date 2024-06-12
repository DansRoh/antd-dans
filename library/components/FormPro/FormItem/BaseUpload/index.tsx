import React, { useMemo, useCallback, useContext } from 'react';
import { Upload as AUpload, Button, message } from 'antd';
import { InboxOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import attrAccept from 'attr-accept';
import { converFileSize } from './utils';
import withFormItem from '../../hoc/withFormItem';
import styles from './index.module.less';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { FILE_TYPE_MAP, IBaseUploadProps } from './types';
import { UploadFile } from 'antd/lib/upload/interface';
import { configContext } from 'library/context';

const { Dragger } = AUpload;

const defaultChilren = (disabled: boolean, listType?: string) => {
  if (listType === 'picture-card') {
    return <PlusOutlined className="picture-card-add-icon" />;
  }
  return (
    <Button disabled={disabled}>
      <UploadOutlined />
      上传文件
    </Button>
  );
};

export const Upload: React.FC<IBaseUploadProps> = (props) => {
  const { upload: uploadConfig } = useContext(configContext);
  const {
    maxCount = Infinity,
    disabled = false,
    dragger = false,
    manual = false,
    tip,
    listType,
    value: _value,
    children,
    action = uploadConfig?.action,
    accept,
    fileType,
    onChange,
    maxSize,
    maxSizeTip,
    fileTypeTip,
    onFinish,
    type,
    ...otherProps
  } = props;
  const value = _value ?? [];
  // 计算实际accept
  const _accept = useMemo(() => {
    if (accept) return accept;
    if (fileType) {
      return Array.isArray(fileType) ? fileType.map((item) => FILE_TYPE_MAP[item]).join(',') : FILE_TYPE_MAP[fileType];
    }
    return '';
  }, [ accept, fileType ]);

  // 渲染children
  const renderChildren = children || defaultChilren(disabled, listType);

  // 上传前拦截
  const beforeUpload = useCallback((file: RcFile, fileList: RcFile[]) => {
    // 文件格式验证
    if (_accept && !attrAccept(file, _accept)) {
      message.error(fileTypeTip || tip || `当前格式不支持，请上传规定文件类型`);
      return AUpload.LIST_IGNORE;
    }

    // 文件大小验证
    if (maxSize && file.size > maxSize) {
      message.error(maxSizeTip || tip || `请上传大小不超过${converFileSize(maxSize)}的文件`);
      return AUpload.LIST_IGNORE;
    }

    // 手动上传则不进行上传
    if (manual) {
      return false;
    }

    return true;
  }, [ _accept, fileTypeTip, manual, maxSize, maxSizeTip, tip ]);

  // 文件上传
  const onFileChange = useCallback(
    ({ fileList }: UploadChangeParam<UploadFile<any>>) => {
      let update = false;
      for (let i = 0; i < fileList?.length; i++) {
        const { status, response, url } = fileList[i];
        if (status === 'done' && !url) {
          const uid = response?.data?.uid;
          fileList[i].url = response?.data?.fileUrl || '';
          if (uid) fileList[i].uid = uid;
          update = true;
        }
      }
      const newList = fileList.filter(({ status, error }) => {
        return status !== 'error' && status !== 'removed';
      });
      if (onChange) onChange(newList);
      if (onFinish && update) onFinish(newList);
    },
    [ onChange, onFinish ]
  );

  const uploadProps = {
    ...otherProps,
    accept: _accept,
    ...uploadConfig,
    action,
    listType,
    disabled,
    fileList: value,
    beforeUpload,
    onChange: onFileChange,
    maxCount,
  };
  if (dragger) {
    return (
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或将文件拖到该区域以上传</p>
        <p className="ant-upload-hint">
          { tip }
        </p>
      </Dragger>
    );
  }
  return (
    <div id={(props as any).name || ''}>
      <AUpload
        className={`${styles.upload}`}
        name="tempFile"
        {...uploadProps}
      >
        {value?.length < maxCount && renderChildren}
      </AUpload>
      {tip && value?.length === 0 && <p className={styles.tip}>{tip}</p>}
    </div>
  );
};
export default withFormItem(Upload);
