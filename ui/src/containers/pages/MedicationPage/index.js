import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CrudTable from 'components/CrudTable';
import MedicationForm from 'containers/form/MedicationForm';
import { getMedicationList, deleteMedication } from 'actions/medication';

const MedicationPage = () => {
  const medicationList = useSelector(state => state.medication.entities);
  const dispatch = useDispatch();
  const deleteMedicationAction = id => dispatch(deleteMedication(id));

  useEffect(() => {
    dispatch(getMedicationList());
  }, [dispatch]);

  return (
    <CrudTable
      headers={['Name', 'Side Effects']}
      rowKeys={['name', 'sideEffects']}
      entities={Object.values(medicationList)}
      EntityForm={MedicationForm}
      addButtonLabel="Add Medication"
      onDelete={deleteMedicationAction}
    />
  );
};

export default MedicationPage;
