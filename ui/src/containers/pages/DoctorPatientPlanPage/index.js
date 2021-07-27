import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import CrudTable from 'components/CrudTable';
import PlanEntryForm from 'containers/form/PlanEntryForm';
import { getPlanDetails, deletePlan } from 'actions/plans';

const DoctorPatientPlanPage= () => {
  const dispatch = useDispatch();
  const { patientId, planId } = useParams();
  const entities = useSelector(state => (state.plans.entities[planId] || {}).entries || []);
  const displayEntities = useSelector(
    state => entities.map(({ medicationId, ...rest }) => ({
      ...rest,
      medication: state.medication.entities[medicationId]
    }))
  );
  const onDelete = id => dispatch(deletePlan({ patientId, id }));

  useEffect(() => {
    dispatch(getPlanDetails({ patientId, planId }));
  }, [dispatch, patientId, planId]);

  return (
    <CrudTable
      headers={['Medication Name', 'Dosage', 'Intake Interval', 'Measurement Unit']}
      rowKeys={['medication.name', 'dosage', 'interval', 'unit']}
      entities={entities}
      displayEntities={displayEntities}
      EntityForm={PlanEntryForm}
      addButtonLabel="Add Medical Plan Entry"
      onDelete={onDelete}
    />
  );
};

export default DoctorPatientPlanPage;
