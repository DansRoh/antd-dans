// src/components/EnhancedButton/index.tsx
import React, {FC} from 'react';
import { Button, ButtonProps} from 'antd';

export interface EButtonProps extends ButtonProps {}
export const EButton:FC<EButtonProps> = (props) => {
    return <Button {...props} />;
};

export default EButton;
