import React from 'react';
import { ConfigProvider as AConfigProvider, Modal, ModalFuncProps } from 'antd';
import './index.module.less';
import classNames from 'classnames';
import { ConfigProvider, IConfig } from 'library/context';
import { ConfigProviderProps } from 'antd/lib/config-provider';

const BaseModal = () => {
  return <div>modal 开发中 </div>;
};


BaseModal.open = (props?: ModalFuncProps, config?: IConfig, antdConfig?: ConfigProviderProps) => {
  return Modal.confirm({
    icon: null,
    closable: true,
    width: 572,
    bodyStyle: { padding: 0 },
    ...props,
    className: classNames('sc-base-modal', props?.className),
    content: (
      <AConfigProvider {...antdConfig}>
        <ConfigProvider value={config || {}}>
          { props?.content }
        </ConfigProvider>
      </AConfigProvider>
    )
  });
};

export default BaseModal;
