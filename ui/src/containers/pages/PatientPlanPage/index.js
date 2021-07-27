import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import CrudTable from 'components/CrudTable';
import { getPlanDetails } from 'actions/plans';
import { getMedicationList } from 'actions/medication';

const PatientPlanPage= () => {
  const dispatch = useDispatch();
  const { planId } = useParams();
  const { id: patientId } = useSelector(state => state.loggedUser);
  const entities = useSelector(state => (
    ((state.plans.entities[planId] || {}).entries || [])
      .map(({ medicationId, ...rest }) => ({
        ...rest,
        medication: state.medication.entities[medicationId]
      }))
  ));

  useEffect(() => {
    dispatch(getMedicationList());
    if (patientId) {
      dispatch(getPlanDetails({ patientId, planId }));
    }
  }, [dispatch, patientId, planId]);

  return (
    <CrudTable
      headers={['Medication Name', 'Dosage', 'Intake Interval', 'Measurement Unit']}
      rowKeys={['medication.name', 'dosage', 'interval', 'unit']}
      entities={entities}
      readOnly
    />
  );
};

export default PatientPlanPage;
