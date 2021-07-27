import React from 'react';
import { Form } from 'react-final-form';
import {
  Typography,
  Grid,
  Button,
  Link,
  CssBaseline,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Error } from 'components/form';

const useStyles = makeStyles(theme => ({
  container: {
    boxShadow: '0px 0px 12px 5px rgba(196,196,196,0.75)',
    padding: '25px',
    margin: '15% auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '650px',
    background: 'white',
  },
  title: {
	   margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const FormWrapper = ({
  onSubmit,
  validate,
  children,
  title,
  submitButton,
  secondaryButton,
  submitError,
}) => {
  const classes = useStyles();

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={classes.container}>
            <CssBaseline />
            {title && (
              <Typography component="h1" variant="h5" className={classes.title}>
                {title}
              </Typography>
            )}
            {children}
            <Error error={submitError} touched alwaysThere />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {submitButton.text}
            </Button>
            {secondaryButton && (
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href={secondaryButton.link} variant="body2">
                    {secondaryButton.text}
                  </Link>
                </Grid>
              </Grid>
            )}
          </div>
        </form>
      )}
    />
  );
};

export default FormWrapper;
