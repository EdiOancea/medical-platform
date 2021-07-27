import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { getLoggedUser } from 'actions/loggedUser';
import { authenticateUser, signOut } from 'actions/auth';

export const useCorrectUserType = type => {
  const dispatch = useDispatch();
  const userType = useSelector(state => state.loggedUser.user.type);

  useEffect(() => {
    if (userType !== type && localStorage.getItem('userType') !== type) {
			dispatch(signOut());
		}

		if (userType !== type) {
			dispatch(getLoggedUser());
		}
  }, [dispatch, type, userType])
};

export const useCorrectToken = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(state => state.loggedUser.token);

  useEffect(() => {
		const storageToken = localStorage.getItem('token');

		if (!token && !storageToken) {
			history.push('/signin');
		}

		if (!token) {
			dispatch(authenticateUser(storageToken));
		}
	}, [dispatch, history, token]);
}
