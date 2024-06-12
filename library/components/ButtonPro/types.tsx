import { ButtonProps } from 'antd';

export type type = 'default' | 'primary' | 'text' | 'link';
export type HTMLType = 'submit' | 'reset';

export interface IButtonProps extends ButtonProps {
  permission?: string | ((permissionData: any) => boolean),
}
