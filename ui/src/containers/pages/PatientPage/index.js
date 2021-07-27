import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPlanList } from 'actions/plans';
import SeePatientPlanButton from 'containers/buttons/SeePatientPlanButton';
import CrudTable from 'components/CrudTable';

const PatientPage = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.loggedUser);
  const patientPlans = useSelector(state => Object.values(state.plans.entities));

  useEffect(() => {
    if (id) {
      dispatch(getPlanList(id));
    }
  }, [dispatch, id]);

  return (
    <CrudTable
      headers={['Name', 'Start Date', 'End Date']}
      rowKeys={['name', 'startDate', 'endDate']}
      entities={patientPlans}
      readOnly
      extraActions={[{
        Header: () => <div>See Plan Entries</div>,
        Action: SeePatientPlanButton,
        key: 'seePatientPlans',
      }]}
    />
  );
};

export default PatientPage;
