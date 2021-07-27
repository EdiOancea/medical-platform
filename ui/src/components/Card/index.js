import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    maxWidth: 300,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CustomCard = ({ action, children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent onClick={action}>
        <Typography variant="h5" component="h2">
          View {children}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CustomCard;
