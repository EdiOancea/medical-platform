import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as Yup from 'yup';

import { getValidate } from 'utils/form';
import { createPlan, updatePlan } from 'actions/plans';
import FormDialog from 'components/FormDialog';
import PlanFormComponent from 'components/form/PlanForm';

const validate = getValidate(
  Yup.object().shape({
  	name: Yup.string().required('Name is required.'),
  	startDate: Yup.date(),
    endDate: Yup.date(),
  })
);

const PlanForm = ({ children, entity = {} }) => {
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const submitError = useSelector(state => state.formError.plans);
  const upsert = entity.id ? updatePlan : createPlan;
  const onSubmit = (values, ...rest) => dispatch(
    upsert({ ...values, patientId}, ...rest)
  );

  return (
    <FormDialog
      title="Add Plan"
      FormContent={PlanFormComponent}
      validate={validate}
      onSubmit={onSubmit}
      initialValues={entity}
      submitError={submitError}
    >
      {children}
    </FormDialog>
  )
};

export default PlanForm;
