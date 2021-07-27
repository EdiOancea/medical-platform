import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { IconButton } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';

const SeePatientPlansButton = ({ entity: { id } }) => {
  const userType = useSelector(state => state.loggedUser.user.type);
  const history = useHistory();
  const onClick = () => {
    switch (userType) {
      case 'doctor':
        return history.push(`/doctor/patients/${id}`);
      case 'caregiver':
        return history.push(`/caregiver/patients/${id}`);
      default:
        return;
    }
  }

  return (
    <IconButton onClick={onClick}>
      <AddCircleIcon />
    </IconButton>
  );
}

export default SeePatientPlansButton;
