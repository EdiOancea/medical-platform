import React from 'react';
import { Field } from 'react-final-form';
import { DatePicker } from '@material-ui/pickers';

import { Error } from 'components/form';

const DatePickerField = ({
  variant = 'inline',
  inputVariant = 'outlined',
  margin = 'normal',
  fullWidth = true,
  id,
  label,
  name,
  autoOk = true,
  defaultValue,
  format = 'DD/MM/YYYY',
}) => (
  <Field
    name={name}
    defaultValue={defaultValue}
    render={({ input, meta: { error, touched } }) => (
      <>
        <DatePicker
          {...{
            variant,
            inputVariant,
            margin,
            fullWidth,
            id,
            label,
            autoOk,
            format,
            ...input,
          }}
        />
        <Error error={error} touched={touched} />
      </>
    )}
  />
);

export default DatePickerField;
