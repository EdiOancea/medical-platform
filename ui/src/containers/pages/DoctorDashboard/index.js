import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

import { getPatientsList } from 'actions/patients';

import Card from 'components/Card';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    paddingTop: '5%',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const goToPatientView = () => history.push('/doctor/patients');
  const goToCaregiverView = () => history.push('/doctor/caregivers');
  const goToMedicationView = () => history.push('/medication');

  useEffect(() => {
    dispatch(getPatientsList());
  }, [dispatch]);

  return (
    <Fragment>
      <h1 className={classes.title}>
        Welcome to Integrated Medical Monitoring Platform for Home-care assistance
      </h1>
      <div className={classes.container}>
        <Card action={goToPatientView}>Patients</Card>
        <Card action={goToCaregiverView}>Caregivers</Card>
        <Card action={goToMedicationView}>Medication</Card>
      </div>
    </Fragment>
  );
};

export default DoctorDashboard;
