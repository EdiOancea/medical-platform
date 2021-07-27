import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { getValidate } from 'utils/form';
import { createMedication, updateMedication } from 'actions/medication';
import FormDialog from 'components/FormDialog';
import MedicationFormComponent from 'components/form/MedicationForm';

const validate = getValidate(
  Yup.object().shape({
  	name: Yup.string().required('Name is required.'),
  	sideEffects: Yup.string(),
  })
);

const MedicationForm = ({ children, entity = {} }) => {
  const dispatch = useDispatch();
  const submitError = useSelector(state => state.formError.medication);
  const upsert = entity.id ? updateMedication : createMedication;
  const onSubmit = (...args) => dispatch(upsert(...args));

  return (
    <FormDialog
      title="Add Medication"
      FormContent={MedicationFormComponent}
      validate={validate}
      onSubmit={onSubmit}
      initialValues={entity}
      submitError={submitError}
    >
      {children}
    </FormDialog>
  )
};

export default MedicationForm;
