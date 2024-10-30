import React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';

interface CommonButtonProps extends ButtonProps {
  text: string;
  icon?: React.ReactNode; 
}

const CommonButton: React.FC<CommonButtonProps> = ({ text, icon, ...props }) => {
  return (
    <Button {...props} startIcon={icon}>
      {text}
    </Button>
  );
};

export default CommonButton;
