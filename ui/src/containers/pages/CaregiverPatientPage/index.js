import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getPlanList } from 'actions/plans';
import SeePatientPlanButton from 'containers/buttons/SeePatientPlanButton';
import CrudTable from 'components/CrudTable';

const CaregiverPatientPage = () => {
  const dispatch = useDispatch();
  const planList = useSelector(state => Object.values(state.plans.entities));
  const { patientId } = useParams();

  useEffect(() => {
    dispatch(getPlanList(patientId));
  }, [dispatch, patientId]);
  return (
    <CrudTable
      headers={['Name', 'Start Date', 'End Date']}
      rowKeys={['name', 'startDate', 'endDate']}
      entities={planList}
      title="Patients' Plans"
      readOnly
      extraActions={[{
        Header: () => <div>See Plan Entries</div>,
        Action: SeePatientPlanButton,
        key: 'seePatientPlans',
      }]}
    />
  );
};

export default CaregiverPatientPage;
