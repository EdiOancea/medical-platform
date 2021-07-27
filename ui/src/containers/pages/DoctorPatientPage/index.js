import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CrudTable from 'components/CrudTable';
import PatientForm from 'containers/form/PatientForm';
import SeePatientPlansButton from 'containers/buttons/SeePatientPlansButton';
import { getPatientsList, deletePatient } from 'actions/patients';
import { getCaregiversList } from 'actions/caregivers';

const DoctorPatientPage = () => {
  const patientList = useSelector(
    state => Object.values(state.patients.entities)
      .map(({birthDate, caregiverId, ...rest}) => ({
        ...rest,
        birthDate: new Date(birthDate).toLocaleDateString(),
        caregiver: state.caregivers.entities[caregiverId],
        caregiverId,
      }))
  );
  const dispatch = useDispatch();
  const deletePatientAction = id => dispatch(deletePatient(id));

  useEffect(() => {
    dispatch(getPatientsList());
    dispatch(getCaregiversList());
  }, [dispatch]);

  return (
    <CrudTable
      headers={['Name', 'Gender', 'Address', 'Birth Date', 'Caregiver']}
      rowKeys={['name', 'gender', 'address', 'birthDate', 'caregiver.name']}
      entities={patientList}
      EntityForm={PatientForm}
      addButtonLabel="Add Patient"
      onDelete={deletePatientAction}
      extraActions={[{
        Header: () => <div>Add Plans</div>,
        Action: SeePatientPlansButton,
        key: 'seePatientPlans',
      }]}
    />
  );
};

export default DoctorPatientPage;
