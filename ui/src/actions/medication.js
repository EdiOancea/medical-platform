import request from 'utils/request';
import { setFormError, clearFormError } from './form';

const getMedicationRequest = () => ({ type: 'GET_MEDICATION_REQUEST' });
const getMedicationFailure = () => ({ type: 'GET_MEDICATION_FAILURE' });
const getMedicationSuccess = payload => ({
  type: 'GET_MEDICATION_SUCCESS',
  payload,
});

export const getMedicationList = () => async dispatch => {
  dispatch(getMedicationRequest());
	const medicationList = await request('GET', '/medication');
	const { error } = medicationList;

	if (error) {
    dispatch(getMedicationFailure());

    return;
	}

  dispatch(getMedicationSuccess(medicationList));
};

const createMedicationRequest = () => ({ type: 'CREATE_MEDICATION_REQUEST' });
const createMedicationFailure = () => ({ type: 'CREATE_MEDICATION_FAILURE' });
const createMedicationSuccess = payload => ({
  type: 'CREATE_MEDICATION_SUCCESS',
  payload,
});

export const createMedication = (data, onSuccess) => async dispatch => {
  dispatch(createMedicationRequest());
  const medication = await request('POST', '/medication', data);
  const { error } = medication;

  if (error) {
    dispatch(createMedicationFailure());
    dispatch(setFormError('medication', error));

    return;
  }

  onSuccess();
  dispatch(createMedicationSuccess(medication));
  clearFormError('medication');
};

const updateMedicationRequest = () => ({ type: 'UPDATE_MEDICATION_REQUEST' });
const updateMedicationFailure = () => ({ type: 'UPDATE_MEDICATION_FAILURE' });
const updateMedicationSuccess = payload => ({
  type: 'UPDATE_MEDICATION_SUCCESS',
  payload,
});

export const updateMedication = (data, onSuccess) => async dispatch => {
  dispatch(updateMedicationRequest());
  const medication = await request('PUT', `/medication/${data.id}`, data);
  const { error } = medication;

  if (error) {
    dispatch(updateMedicationFailure());
    dispatch(setFormError('medication', error));

    return;
  }

  onSuccess();
  dispatch(updateMedicationSuccess(medication));
  clearFormError('medication');
};

const deleteMedicationSuccess = id => ({ type: 'DELETE_MEDICATION_SUCCESS', payload: id });

export const deleteMedication = id => async dispatch => {
  const { error } = await request('DELETE', `/medication/${id}`);

  if (!error) {
    dispatch(deleteMedicationSuccess(id));
  }
}
