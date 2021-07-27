const initialState = {};

export default (state = initialState, action) => {
  const { type, error, path } = action;

  switch (type) {
    case 'SET_FORM_ERROR':
      return { ...state, [path]: error };
    case 'CLEAR_FORM_ERROR':
      return { ...state, [path]: null };
    default:
      return state;
  }
};
