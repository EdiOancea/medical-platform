import React from 'react';
import { Route } from 'react-router-dom';

import { useCorrectToken, useCorrectUserType } from 'hooks/routes';

const DoctorRoute = props => {
	useCorrectToken();
	useCorrectUserType('doctor');

	return <Route {...props} />;
};

export default DoctorRoute;
