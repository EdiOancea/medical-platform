import React from 'react';
import { Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';

import { Error } from 'components/form';

const CustomTextField = ({
  variant = 'outlined',
  fullWidth = true,
  name,
  ...rest
}) => (
  <Field
    name={name}
    render={({ input, meta: { error, touched } }) => (
      <>
        <TextField
          {...{
            variant,
            fullWidth,
            ...rest,
            ...input,
          }}
        />
        <Error error={error} touched={touched} />
      </>
    )}
  />
);

export default CustomTextField;
