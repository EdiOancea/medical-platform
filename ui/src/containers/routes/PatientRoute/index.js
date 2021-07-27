import React from 'react';
import { Route } from 'react-router-dom';

import { useCorrectToken, useCorrectUserType } from 'hooks/routes';

const PatientRoute = props => {
	useCorrectToken();
	useCorrectUserType('patient');

	return <Route {...props} />;
};

export default PatientRoute;
