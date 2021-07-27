import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

const Lock = () => {
  const { avatar } = useStyles();

  return (
    <Avatar className={avatar}>
      <LockOutlinedIcon />
    </Avatar>
  );
};

export default Lock;
