import React from 'react';
import { IButtonProps } from './types';
import { Button } from 'antd';
import { configContext } from '../../context';
import { useContext } from 'react';
import './index.less';


// 从mobx或者context读取权限树
// 使用的时候直接传入code 例如LIE0001或者一个函数

const defaultCheckPermission = (data: string[], code: string) => {
  if (!data) return true;
  return data?.includes(code);
};

/** 基于antd的Button，具有权限功能 */
const ButtonPro = (props: IButtonProps) => {
  const { permissionData, checkPermission } = useContext(configContext);
  const {
    children,
    permission,
    ...remain
  } = props;
  if (typeof permission === 'function') {
    if (permission(permissionData) === false) return null;
  } else if (typeof permission === 'string') {
    const checkHandle = checkPermission || defaultCheckPermission;
    if (checkHandle(permissionData, permission) === false) {
      return null;
    }
  }
  return (
    <Button
      {...remain}
    >
      {children}
    </Button>
  );
};
export default ButtonPro;
