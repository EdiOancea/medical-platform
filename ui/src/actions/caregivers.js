import request from 'utils/request';
import { setFormError, clearFormError } from './form';

const getCaregiversRequest = () => ({ type: 'GET_CAREGIVERS_REQUEST' });
const getCaregiversFailure = () => ({ type: 'GET_CAREGIVERS_FAILURE' });
const getCaregiversSuccess = payload => ({
  type: 'GET_CAREGIVERS_SUCCESS',
  payload,
});

export const getCaregiversList = () => async dispatch => {
  dispatch(getCaregiversRequest());
	const caregiversList = await request('GET', '/caregivers');
	const { error } = caregiversList;

	if (error) {
    dispatch(getCaregiversFailure());

    return;
	}

  dispatch(getCaregiversSuccess(caregiversList));
};

const createCaregiverRequest = () => ({ type: 'CREATE_CAREGIVER_REQUEST' });
const createCaregiverFailure = () => ({ type: 'CREATE_CAREGIVER_FAILURE' });
const createCaregiverSuccess = payload => ({
  type: 'CREATE_CAREGIVER_SUCCESS',
  payload,
});

export const createCaregiver = (data, onSuccess) => async dispatch => {
  dispatch(createCaregiverRequest());
  const caregiver = await request('POST', '/caregivers', data);
  const { error } = caregiver;

  if (error) {
    dispatch(createCaregiverFailure());
    dispatch(setFormError('caregivers', error));

    return;
  }

  onSuccess();
  dispatch(createCaregiverSuccess(caregiver));
  clearFormError('caregivers');
};

const updateCaregiverRequest = () => ({ type: 'UPDATE_CAREGIVER_REQUEST' });
const updateCaregiverFailure = () => ({ type: 'UPDATE_CAREGIVER_FAILURE' });
const updateCaregiverSuccess = payload => ({
  type: 'UPDATE_CAREGIVER_SUCCESS',
  payload,
});

export const updateCaregiver = (data, onSuccess) => async dispatch => {
  dispatch(updateCaregiverRequest());
  const caregiver = await request('PUT', `/caregivers/${data.id}`, data);
  const { error } = caregiver;

  if (error) {
    dispatch(updateCaregiverFailure());
    dispatch(setFormError('caregivers', error));

    return;
  }

  onSuccess();
  dispatch(updateCaregiverSuccess(caregiver));
  clearFormError('caregivers');
};

const deleteCaregiverSuccess = id => ({ type: 'DELETE_CAREGIVER_SUCCESS', payload: id });

export const deleteCaregiver = id => async dispatch => {
  const { error } = await request('DELETE', `/caregivers/${id}`);

  if (!error) {
    dispatch(deleteCaregiverSuccess(id));
  }
}
