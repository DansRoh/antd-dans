import { configContext } from 'library/context';
import { useCallback, useContext } from 'react';
import BaseModal from '../components/Modal/index';
import { ConfigProvider as AConfigProvider, ModalFuncProps } from 'antd';


export const useOpen = () => {
  const config = useContext(configContext);
  const antdConfig = useContext(AConfigProvider.ConfigContext);
  const open = useCallback((props: ModalFuncProps) => {
    BaseModal.open(props, config, antdConfig);
  }, [ antdConfig, config ]);
  return { open };
};

export default useOpen;

