import React from 'react';
import { TextField } from '@mui/material';
import { Field } from 'formik';

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, required }) => {
  return (
    <div>
      <Field name={name}>
        {({ field, meta }: any) => (
          <TextField
            {...field}
            label={label}
            type={type}
            variant="outlined"
            fullWidth
            margin="normal"
            required={required}
            error={meta.touched && Boolean(meta.error)} // Check if the field has been touched and if there's an error
            helperText={meta.touched ? meta.error : undefined} // Show the error message if touched
          />
        )}
      </Field>
    </div>
  );
};

export default InputField;
