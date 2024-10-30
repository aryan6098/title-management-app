import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Field } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <Field name={name}>
        {({ field, meta }: any) => (
          <TextField
            {...field}
            label={label}
            type={type === 'password' && !showPassword ? 'password' : 'text'} // Toggle type based on state
            variant="outlined"
            fullWidth
            margin="normal"
            required={required}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched ? meta.error : undefined}
            InputProps={{
              endAdornment: type === 'password' && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(event) => event.preventDefault()} // Prevent default behavior
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </Field>
    </div>
  );
};

export default InputField;
