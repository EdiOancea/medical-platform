import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import CrudTable from 'components/CrudTable';
import PlanForm from 'containers/form/PlanForm';
import SeePatientPlanButton from 'containers/buttons/SeePatientPlanButton';
import { getPlanList, deletePlan } from 'actions/plans';

const DoctorPatientPlansPage= () => {
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const planList = useSelector(state => state.plans.entities);
  const onDelete = id => dispatch(deletePlan({ patientId, id }));

  useEffect(() => {
    dispatch(getPlanList(patientId));
  }, [dispatch, patientId]);

  return (
    <CrudTable
      headers={['Name', 'Start Date', 'End Date']}
      rowKeys={['name', 'startDate', 'endDate']}
      entities={Object.values(planList)}
      EntityForm={PlanForm}
      addButtonLabel="Add Medical Plan"
      onDelete={onDelete}
      extraActions={[{
        Header: () => <div>Add Plan Entries</div>,
        Action: SeePatientPlanButton,
        key: 'seePatientPlans',
      }]}
    />
  );
};

export default DoctorPatientPlansPage;
