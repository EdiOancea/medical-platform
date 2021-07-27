import request from 'utils/request';
import { setFormError, clearFormError } from './form';

const getPlanDetailsRequest = () => ({ type: 'GET_PLAN_REQUEST' });
const getPlanDetailsFailure = () => ({ type: 'GET_PLAN_FAILURE' });
const getPlanDetailsSuccess = payload => ({
  type: 'GET_PLAN_SUCCESS',
  payload,
});

export const getPlanDetails = ({ patientId, planId }) => async dispatch => {
  dispatch(getPlanDetailsRequest());
  const plan = await request('GET', `/patients/${patientId}/plans/${planId}`);
  const { error } = plan;

  if (error) {
    dispatch(getPlanDetailsFailure());

    return;
  }

  dispatch(getPlanDetailsSuccess(plan));
}

const getPlansRequest = () => ({ type: 'GET_PLANS_REQUEST' });
const getPlansFailure = () => ({ type: 'GET_PLANS_FAILURE' });
const getPlansSuccess = payload => ({
  type: 'GET_PLANS_SUCCESS',
  payload,
});

export const getPlanList = patientId => async dispatch => {
  dispatch(getPlansRequest());
	const planList = await request('GET', `/patients/${patientId}/plans`);
	const { error } = planList;

	if (error) {
    dispatch(getPlansFailure());

    return;
	}

  dispatch(getPlansSuccess(planList));
};

const createPlanRequest = () => ({ type: 'CREATE_PLAN_REQUEST' });
const createPlanFailure = () => ({ type: 'CREATE_PLAN_FAILURE' });
const createPlanSuccess = payload => ({
  type: 'CREATE_PLAN_SUCCESS',
  payload,
});

export const createPlan = ({ patientId, ...rest }, onSuccess) => async dispatch => {
  dispatch(createPlanRequest());
  const plan = await request('POST', `/patients/${patientId}/plans`, rest);
  const { error } = plan;

  if (error) {
    dispatch(createPlanFailure());
    dispatch(setFormError('plan', error));

    return;
  }

  onSuccess();
  dispatch(createPlanSuccess(plan));
  clearFormError('plan');
};

const updatePlanRequest = () => ({ type: 'UPDATE_PLAN_REQUEST' });
const updatePlanFailure = () => ({ type: 'UPDATE_PLAN_FAILURE' });
const updatePlanSuccess = payload => ({
  type: 'UPDATE_PLAN_SUCCESS',
  payload,
});

export const updatePlan = (
  { patientId, id, ...rest },
  onSuccess
) => async dispatch => {
  dispatch(updatePlanRequest());
  const plan = await request('PUT', `/patients/${patientId}/plans/${id}`, rest);
  const { error } = plan;

  if (error) {
    dispatch(updatePlanFailure());
    dispatch(setFormError('plan', error));

    return;
  }

  onSuccess();
  dispatch(updatePlanSuccess(plan));
  clearFormError('plan');
};

const deletePlanSuccess = id => ({ type: 'DELETE_PLAN_SUCCESS', payload: id });

export const deletePlan = ({ patientId, id }) => async dispatch => {
  const { error } = await request('DELETE', `/patients/${patientId}/plans/${id}`);

  if (!error) {
    dispatch(deletePlanSuccess(id));
  }
}

const createPlanEntryRequest = () => ({ type: 'CREATE_PLAN_ENTRY_REQUEST' });
const createPlanEntryFailure = () => ({ type: 'CREATE_PLAN_ENTRY_FAILURE' });
const createPlanEntrySuccess = payload => ({
  type: 'CREATE_PLAN_ENTRY_SUCCESS',
  payload,
});

export const createPlanEntry = (
  { patientId, planId, ...rest },
  onSuccess
) => async dispatch => {
  dispatch(createPlanEntryRequest());
  const planEntry = await request(
    'POST',
    `/patients/${patientId}/plans/${planId}/entries`,
    rest
  );
  const { error } = planEntry;

  if (error) {
    dispatch(createPlanEntryFailure());
    dispatch(setFormError('planEntries', error));

    return;
  }

  onSuccess();
  dispatch(createPlanEntrySuccess(planEntry));
  clearFormError('planEntries');
}

const updatePlanEntryRequest = () => ({ type: 'UPDATE_PLAN_ENTRY_REQUEST' });
const updatePlanEntryFailure = () => ({ type: 'UPDATE_PLAN_ENTRY_FAILURE' });
const updatePlanEntrySuccess = payload => ({
  type: 'UPDATE_PLAN_ENTRY_SUCCESS',
  payload,
});

export const updatePlanEntry = (
  { patientId, planId, id, ...rest },
  onSuccess
) => async dispatch => {
  dispatch(updatePlanEntryRequest());
  const planEntry = await request(
    'PUT',
    `/patients/${patientId}/plans/${planId}/entries/${id}`,
    rest
  );
  const { error } = planEntry;

  if (error) {
    dispatch(updatePlanEntryFailure());
    dispatch(setFormError('planEntries', error));

    return;
  }

  onSuccess();
  dispatch(updatePlanEntrySuccess(planEntry));
  clearFormError('planEntries');
};

const deletePlanEntrySuccess = id => ({
  type: 'DELETE_PLAN_ENTRY_SUCCESS',
  payload: id
});

export const deletePlanEntry = ({ patientId, planId, id }) => async dispatch => {
  const { error } = await request(
    'DELETE',
    `/patients/${patientId}/plans/${id}/entries/${id}`
  );

  if (!error) {
    dispatch(deletePlanEntrySuccess(id));
  }
}
