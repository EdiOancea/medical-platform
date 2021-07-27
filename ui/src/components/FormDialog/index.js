import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import { Error } from 'components/form';

const useSyles = makeStyles({
  dialog: {
    minWidth: 500,
  },
});

const FormDialog = ({
  children,
  title,
  onSubmit,
  validate,
  FormContent,
  initialValues = {},
  submitError,
}) => {
  const [open, setOpen] = useState(false);
  const classes = useSyles();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFormSubmit = values => {
    onSubmit(values, () => setOpen(false));
  }

  return (
    <div>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog open={open} onClose={handleClose}>
        <Form
          onSubmit={onFormSubmit}
          validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit, dirty }) => (
            <form onSubmit={handleSubmit}>
              <DialogTitle>{title}</DialogTitle>
              <DialogContent className={classes.dialog}>
                <FormContent />
                <Error error={submitError} touched alwaysThere />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={!dirty}>
                  Submit
                </Button>
              </DialogActions>
            </form>
          )}
        />
      </Dialog>
    </div>
  );
}

export default FormDialog;
