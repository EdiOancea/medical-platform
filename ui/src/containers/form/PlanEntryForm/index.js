import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as Yup from 'yup';

import { getValidate } from 'utils/form';
import { createPlanEntry, updatePlanEntry } from 'actions/plans';
import { getMedicationList } from 'actions/medication';
import FormDialog from 'components/FormDialog';
import PlanEntryFormComponent from 'components/form/PlanEntryForm';

const validate = getValidate(
  Yup.object().shape({
    medicationId: Yup.string().required(),
  	dosage: Yup.number().required().positive().integer(),
    unit: Yup.string(),
    interval: Yup.number().required().positive().integer(),
  })
);

const PlanEntryForm = ({ children, entity = {} }) => {
  const dispatch = useDispatch();
  const { patientId, planId } = useParams();
  const submitError = useSelector(state => state.formError.planEntries);
  const medicationOptions = useSelector(
    state => Object.values(state.medication.entities)
      .map(({ name, id }) => ({ label: name, id }))
  )
  const upsert = entity.id ? updatePlanEntry : createPlanEntry;
  const onSubmit = (values, ...rest) => {
    dispatch(upsert({ ...values, patientId, planId }, ...rest));
  }

  useEffect(() => {
    dispatch(getMedicationList());
  }, [dispatch])

  return (
    <FormDialog
      title="Add Plan Entry"
      FormContent={() => <PlanEntryFormComponent medicationOptions={medicationOptions} />}
      validate={validate}
      onSubmit={onSubmit}
      initialValues={entity}
      submitError={submitError}
    >
      {children}
    </FormDialog>
  )
};

export default PlanEntryForm;
