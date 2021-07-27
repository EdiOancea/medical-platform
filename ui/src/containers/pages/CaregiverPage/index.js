import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CrudTable from 'components/CrudTable';
import SeePatientPlansButton from 'containers/buttons/SeePatientPlansButton';
import { getPatientsList } from 'actions/patients';

const CaregiverPage = () => {
  const dispatch = useDispatch();
  const patientList = useSelector(state => Object.values(state.patients.entities));

  useEffect(() => {
    dispatch(getPatientsList());
  }, [dispatch]);

  return (
    <CrudTable
      headers={['Name', 'Gender', 'Address', 'Birth Date']}
      rowKeys={['name', 'gender', 'address', 'birthDate']}
      entities={patientList}
      title="Patients"
      readOnly
      extraActions={[{
        Header: () => <div>See Plans</div>,
        Action: SeePatientPlansButton,
        key: 'seePlans'
      }]}
    />
  );
};

export default CaregiverPage;
