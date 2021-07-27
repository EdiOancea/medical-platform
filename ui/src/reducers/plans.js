const initialState = {
  entities: {},
  isLoading: false,
  isSubmitting: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLAN_REQUEST':
    case 'GET_PLANS_REQUEST':
      return { ...state, isLoading: true };

    case 'CREATE_PLAN_REQUEST':
    case 'UPDATE_PLAN_REQUEST':
    case 'CREATE_PLAN_ENTRY_REQUEST':
    case 'UPDATE_PLAN_ENTRY_REQUEST':
      return { ...state, isSubmitting: true };

    case 'GET_PLANS_SUCCESS':
      return {
        ...state,
        entities: action.payload.reduce((acc, { id, ...rest }) => ({
          ...acc,
          [id]: { id, ...rest },
        }), {}),
        isLoading: false,
      };

    case 'GET_PLAN_SUCCESS': {
      const { entities } = state;
      const { payload } = action;
        return {
          ...state,
          entities: {
            ...entities,
            [payload.id]: payload,
          },
          isLoading: false,
        };
    }

    case 'CREATE_PLAN_SUCCESS':
    case 'UPDATE_PLAN_SUCCESS': {
      const { entities } = state;
      const { payload } = action;

      return {
        ...state,
        entities: {
          ...entities,
          [payload.id]: payload,
        },
        isSubmitting: false,
      };
    }

    case 'CREATE_PLAN_ENTRY_SUCCESS': {
      const { entities } = state;
      const { payload } = action;
      const { planId } = payload;

      return {
        ...state,
        entities: {
          ...entities,
          [planId]: {
            ...entities[planId],
            entries: [...entities[planId].entries, payload],
          },
        },
      };
    }

    case 'UPDATE_PLAN_ENTRY_SUCCESS': {
      const { entities } = state;
      const { payload } = action;
      const { planId } = payload;
      const updatedEntries = [...entities[planId].entries];
      updatedEntries.splice(
        updatedEntries.findIndex(entry => entry.id === payload.id),
        1,
        payload,
      );

      return {
        ...state,
        entities: {
          ...entities,
          [planId]: {
            ...entities[planId],
            entries: updatedEntries,
          },
        },
      };
    }

    case 'CREATE_PLAN_FAILURE':
    case 'UPDATE_PLAN_FAILURE':
      return { ...state, isSubmitting: false };


    case 'GET_PLANS_FAILURE':
    case 'SIGN_OUT':
      return initialState;

    case 'DELETE_PLAN_SUCCESS':
      const { payload } = action;
      const { entities: { [payload]: _, ...rest } } = state;

      return { ...state, entities: rest };

    case 'DELETE_PLAN_ENTRY_SUCCESS': {
      const { entities } = state;
      const { payload } = action;
      const { planId, id } = payload;

      return {
        ...state,
        entities: {
          ...entities,
          [planId]: {
            ...entities[planId],
            entries: entities[planId].entries.filter(entry => entry.id !== id),
          },
        },
      };
    }

    default:
      return state;
  }
};
