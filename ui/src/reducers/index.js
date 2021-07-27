import { combineReducers } from 'redux';

import loggedUser from './loggedUser';
import formError from './formError';
import medication from './medication';
import patients from './patients';
import caregivers from './caregivers';
import plans from './plans';
import alerts from './alerts';

export default combineReducers({
  loggedUser,
  formError,
  medication,
  patients,
  caregivers,
  plans,
  alerts,
});
