import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import CrudTable from 'components/CrudTable';
import { getPlanDetails } from 'actions/plans';
import { getMedicationList } from 'actions/medication';

const CaregiverPatientPlanPage = () => {
  const dispatch = useDispatch();
  const { patientId, planId } = useParams();
  const entities = useSelector(state => (state.plans.entities[planId] || {}).entries || []);
  const displayEntities = useSelector(
    state => entities.map(({ medicationId, ...rest }) => ({
      ...rest,
      medication: state.medication.entities[medicationId]
    }))
  );

  useEffect(() => {
    dispatch(getMedicationList());
    dispatch(getPlanDetails({ patientId, planId }));
  }, [dispatch, patientId, planId]);

  return (
    <CrudTable
      headers={['Medication Name', 'Dosage', 'Intake Interval', 'Measurement Unit']}
      rowKeys={['medication.name', 'dosage', 'interval', 'unit']}
      entities={entities}
      displayEntities={displayEntities}
      readOnly
    />
  );
};

export default CaregiverPatientPlanPage;
