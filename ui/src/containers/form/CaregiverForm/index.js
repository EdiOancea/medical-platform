import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { getValidate } from 'utils/form';
import { createCaregiver, updateCaregiver } from 'actions/caregivers';
import FormDialog from 'components/FormDialog';
import CaregiverFormComponent from 'components/form/CaregiverForm';

const CaregiverForm = ({ children, entity = {} }) => {
  const submitError = useSelector(state => state.formError.caregivers);
  const dispatch = useDispatch();
  const upsert = entity.id ? updateCaregiver : createCaregiver;
  const onSubmit = (...args) => dispatch(upsert(...args));
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
      title="Add Caregiver"
      FormContent={() => <CaregiverFormComponent isEditMode={!!entity.id} />}
      validate={validate}
      onSubmit={onSubmit}
      initialValues={entity}
      submitError={submitError}
    >
      {children}
    </FormDialog>
  )
};

export default CaregiverForm;
