import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Route } from 'react-router-dom';
import { signOut } from 'actions/auth';

const UnprotectedRoute = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userType = useSelector(state => state.loggedUser.user.type);

  useEffect(() => {
    if (userType) {
      history.push(`/${userType}/dashboard`);
    }
  }, [userType, history]);

  useEffect(() => {
    dispatch(signOut());
  }, [dispatch]);

  return <Route {...props} />;
};

export default UnprotectedRoute;
