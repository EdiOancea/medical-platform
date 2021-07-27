import request from 'utils/request';
import { unsubscribeFromPatientsActivities } from 'utils/patientActivityService';
import { setFormError, clearFormError } from './form';
import { getLoggedUser } from './loggedUser';

export const authenticateUser = payload => ({
  type: 'AUTHENTICATE_USER',
  payload,
});

export const signOut = () => dispatch => {
  localStorage.setItem('token', '');
  localStorage.setItem('userType', '');

  dispatch({ type: 'SIGN_OUT' });
  unsubscribeFromPatientsActivities();
};

export const signUp = data => async dispatch => {
  const result = await request('POST', '/users', data);
  const { error } = result;

  if (error) {
    dispatch(setFormError('signUp', error));

    return;
  }

  dispatch(clearFormError('signUp'));
  dispatch(signIn(data));
};

export const signIn = data => async dispatch => {
  const result = await request('POST', '/signin', data);
  const { token, error } = result;

  if (token) {
    dispatch(clearFormError('signIn'));
    dispatch(authenticateUser(token));
    dispatch(getLoggedUser());
  };

  if (error) {
    dispatch(setFormError('signIn', error));
  }
};
