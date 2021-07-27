import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CrudTable from 'components/CrudTable';
import CaregiverForm from 'containers/form/CaregiverForm';
import { getCaregiversList, deleteCaregiver } from 'actions/caregivers';

const DoctorCaregiverPage = () => {
  const caregiverList = useSelector(
    state => Object.values(state.caregivers.entities)
      .map(({birthDate, ...rest}) => ({
        ...rest,
        birthDate: new Date(birthDate).toLocaleDateString(),
      }))
  );
  const dispatch = useDispatch();
  const deleteCaregiverAction = id => dispatch(deleteCaregiver(id));

  useEffect(() => {
    dispatch(getCaregiversList());
  }, [dispatch]);

  return (
    <CrudTable
      headers={['Name', 'Gender', 'Address', 'Birth Date']}
      rowKeys={['name', 'gender', 'address', 'birthDate']}
      entities={caregiverList}
      EntityForm={CaregiverForm}
      addButtonLabel="Add Caregiver"
      onDelete={deleteCaregiverAction}
    />
  );
};

export default DoctorCaregiverPage;
