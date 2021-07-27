import request from 'utils/request';
import { setFormError, clearFormError } from './form';
import { addAlert, clearPatientAlerts } from './alerts';
import {
  addPatientToSubscription,
  removePatientFromSubscription,
  subscribeToPatientsActivities,
} from 'utils/patientActivityService';
const getPatientsRequest = () => ({ type: 'GET_PATIENTS_REQUEST' });
const getPatientsFailure = () => ({ type: 'GET_PATIENTS_FAILURE' });
const getPatientsSuccess = payload => ({
  type: 'GET_PATIENTS_SUCCESS',
  payload,
});

export const getPatientsList = () => async dispatch => {
  dispatch(getPatientsRequest());
	const patientsList = await request('GET', '/patients');
	const { error } = patientsList;

	if (error) {
    dispatch(getPatientsFailure());

    return;
	}

  dispatch(getPatientsSuccess(patientsList));
  subscribeToPatientsActivities(patientsList.map(
    ({ id }) => id),
    (...args) => dispatch(addAlert(...args))
  );
};

const createPatientRequest = () => ({ type: 'CREATE_PATIENT_REQUEST' });
const createPatientFailure = () => ({ type: 'CREATE_PATIENT_FAILURE' });
const createPatientSuccess = payload => ({
  type: 'CREATE_PATIENT_SUCCESS',
  payload,
});

export const createPatient = (data, onSuccess) => async dispatch => {
  dispatch(createPatientRequest());
  const patient = await request('POST', '/patients', data);
  const { error } = patient;

  if (error) {
    dispatch(createPatientFailure());
    dispatch(setFormError('patients', error));

    return;
  }

  onSuccess();
  dispatch(createPatientSuccess(patient));
  addPatientToSubscription(patient.id)
  clearFormError('patients');
};

const updatePatientRequest = () => ({ type: 'UPDATE_PATIENT_REQUEST' });
const updatePatientFailure = () => ({ type: 'UPDATE_PATIENT_FAILURE' });
const updatePatientSuccess = payload => ({
  type: 'UPDATE_PATIENT_SUCCESS',
  payload,
});

export const updatePatient = (data, onSuccess) => async dispatch => {
  dispatch(updatePatientRequest());
  const patient = await request('PUT', `/patients/${data.id}`, data);
  const { error } = patient;

  if (error) {
    dispatch(updatePatientFailure());
    dispatch(setFormError('patients', error));

    return;
  }

  onSuccess();
  dispatch(updatePatientSuccess(patient));
  clearFormError('patients');
};

const deletePatientSuccess = id => ({ type: 'DELETE_PATIENT_SUCCESS', payload: id });

export const deletePatient = id => async dispatch => {
  const { error } = await request('DELETE', `/patients/${id}`);

  if (!error) {
    removePatientFromSubscription(id);
    dispatch(clearPatientAlerts(id));
    dispatch(deletePatientSuccess(id));
  }
}
