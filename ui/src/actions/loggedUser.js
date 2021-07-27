import request from 'utils/request';

export const setUser = user => ({
	type: 'SET_USER',
	payload: user,
})

export const getLoggedUser = () => async dispatch => {
	const user = await request('GET', '/users/me');
	const { error } = user;

	if (!error) {
		dispatch(setUser(user));
	}
};
