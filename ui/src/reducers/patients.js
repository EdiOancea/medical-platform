const initialState = {
  entities: {},
  isLoading: false,
  isSubmitting: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PATIENTS_REQUEST':
      return { ...state, isLoading: true };

    case 'CREATE_PATIENT_REQUEST':
    case 'UPDATE_PATIENT_REQUEST':
      return { ...state, isSubmitting: true };

    case 'GET_PATIENTS_SUCCESS':
      return {
        ...state,
        entities: action.payload.reduce((acc, { id, ...rest }) => ({
          ...acc,
          [id]: { id, ...rest },
        }), {}),
        isLoading: false,
      };

    case 'CREATE_PATIENT_SUCCESS':
    case 'UPDATE_PATIENT_SUCCESS': {
      const { entities } = state;
      const { payload } = action;

      return {
        ...state,
        entities: {
          ...entities,
          [payload.id]: payload,
        },
      };
    }


    case 'CREATE_PATIENT_FAILURE':
    case 'UPDATE_PATIENT_FAILURE':
      return { ...state, isSubmitting: false };


    case 'GET_PATIENTS_FAILURE':
    case 'SIGN_OUT':
      return initialState;

    case 'DELETE_PATIENT_SUCCESS':
      const { payload } = action;
      const { entities: { [payload]: _, ...rest } } = state;

      return { ...state, entities: rest };

    default:
      return state;
  }
};
