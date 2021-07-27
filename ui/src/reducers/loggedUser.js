const initialState = {
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER':
      localStorage.setItem('token', action.payload);

      return { ...state, token: action.payload };

    case 'SET_USER':
      localStorage.setItem('userType', action.payload.user.type);

      return { ...state, ...action.payload };

    case 'SIGN_OUT':
      return initialState;

    default:
      return state;
  }
};
