import React from 'react';
import { FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
  	marginLeft: theme.spacing(1),
  	marginRight: 'auto',
  },
}));

const Error = ({ error, touched, alwaysThere }) => {
	const classes = useStyles();
	const display = error || (alwaysThere ? ' ' : '');

	return touched && (
		<FormHelperText className={classes.root}>
			{display}
		</FormHelperText>
	);
};

export default Error;
