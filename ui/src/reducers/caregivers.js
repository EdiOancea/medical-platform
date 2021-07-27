const initialState = {
  entities: {},
  isLoading: false,
  isSubmitting: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CAREGIVERS_REQUEST':
      return { ...state, isLoading: true };

    case 'CREATE_CAREGIVER_REQUEST':
    case 'UPDATE_CAREGIVER_REQUEST':
      return { ...state, isSubmitting: true };

    case 'GET_CAREGIVERS_SUCCESS':
      return {
        ...state,
        entities: action.payload.reduce((acc, { id, ...rest }) => ({
          ...acc,
          [id]: { id, ...rest },
        }), {}),
        isLoading: false,
      };

    case 'CREATE_CAREGIVER_SUCCESS':
    case 'UPDATE_CAREGIVER_SUCCESS': {
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


    case 'CREATE_CAREGIVER_FAILURE':
    case 'UPDATE_CAREGIVER_FAILURE':
      return { ...state, isSubmitting: false };


    case 'GET_CAREGIVERS_FAILURE':
    case 'SIGN_OUT':
      return initialState;

    case 'DELETE_CAREGIVER_SUCCESS':
      const { payload } = action;
      const { entities: { [payload]: _, ...rest } } = state;

      return { ...state, entities: rest };

    default:
      return state;
  }
};
