import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { IconButton } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';

const SeePatientPlanButton = ({ entity: { patientId, id } }) => {
  const history = useHistory();
  const userType = useSelector(state => state.loggedUser.user.type);
  const onClick = () => {
    switch (userType) {
      case 'doctor':
        return history.push(`/doctor/patients/${patientId}/plans/${id}`);
      case 'caregiver':
        return history.push(`/caregiver/patients/${patientId}/plans/${id}`);
      case 'patient':
        return history.push(`/patient/plans/${id}`);
      default:
        return;
    }
  }

  return (
    <IconButton onClick={onClick}>
      <AddCircleIcon />
    </IconButton>
  );
};

export default SeePatientPlanButton;
