const initialState = {
  entities: {},
  isLoading: false,
  isSubmitting: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MEDICATION_REQUEST':
      return { ...state, isLoading: true };

    case 'CREATE_MEDICATION_REQUEST':
    case 'UPDATE_MEDICATION_REQUEST':
      return { ...state, isSubmitting: true };

    case 'GET_MEDICATION_SUCCESS':
      return {
        ...state,
        entities: action.payload.reduce((acc, { id, ...rest }) => ({
          ...acc,
          [id]: { id, ...rest },
        }), {}),
        isLoading: false,
      };

    case 'CREATE_MEDICATION_SUCCESS':
    case 'UPDATE_MEDICATION_SUCCESS': {
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


    case 'CREATE_MEDICATION_FAILURE':
    case 'UPDATE_MEDICATION_FAILURE':
      return { ...state, isSubmitting: false };


    case 'GET_MEDICATION_FAILURE':
    case 'SIGN_OUT':
      return initialState;

    case 'DELETE_MEDICATION_SUCCESS':
      const { payload } = action;
      const { entities: { [payload]: _, ...rest } } = state;

      return { ...state, entities: rest };

    default:
      return state;
  }
};
