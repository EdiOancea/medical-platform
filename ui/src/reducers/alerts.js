import { uuid } from 'uuidv4';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ALERT':
      return { ...state, [uuid()]: action.payload };

    case 'REMOVE_ALERT': {
      const { [action.payload]: _, ...rest } = state;

      return rest;
    }

    case 'CLEAR_ALERTS': {
      const { payload: patientId } = action;

      return Object.entries(state).reduce((acc, [key, alert]) => (
        alert.patientId === patientId
          ? acc
          : { ...acc, [key]: alert }
      ), {});
    }

    default:
      return state;
  }
};
