import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { signOut } from 'actions/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.light,
  },
  title: {
    flexGrow: 1,
  },
}));

const CustomAppBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isUserLogged = !!useSelector(state => state.loggedUser.token);
  const logout = () => dispatch(signOut());

  return isUserLogged && (
    <div className={classes.root}>
      <AppBar position="static" className={classes.colorPrimary}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            IMMPlaH
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default CustomAppBar;
