import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { getValidate } from 'utils/form';
import { createPatient, updatePatient } from 'actions/patients';
import FormDialog from 'components/FormDialog';
import PatientFormComponent from 'components/form/PatientForm';

const PatientForm = ({ children, entity = {} }) => {
  const dispatch = useDispatch();
  const caregivers = useSelector(state => state.caregivers.entities);
  const submitError = useSelector(state => state.formError.patients);
  const upsert = entity.id ? updatePatient : createPatient;
  const onSubmit = (...args) => dispatch(upsert(...args));
  const caregiverOptions = Object.values(caregivers).map(({ id, name }) => ({
    id,
    label: name,
  }));
  const validate = getValidate(Yup.object().shape({
    ...(entity.id ? {} : {
      email: Yup.string().email().required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    name: Yup.string().required('Name is required.'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string(),
    birthDate: Yup.date().required('Required'),
    caregiverId: Yup.string().nullable(),
  }));

  return (
    <FormDialog
      title="Add Patient"
      FormContent={() => (
        <PatientFormComponent
          isEditMode={!!entity.id}
          caregiverOptions={caregiverOptions}
        />
      )}
      validate={validate}
      onSubmit={onSubmit}
      initialValues={entity}
      submitError={submitError}
    >
      {children}
    </FormDialog>
  )
};

export default PatientForm;
