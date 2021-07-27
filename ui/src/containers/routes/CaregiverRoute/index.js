import React from 'react';
import { Route } from 'react-router-dom';

import { useCorrectToken, useCorrectUserType } from 'hooks/routes';

const CaregiverRoute = props => {
	useCorrectToken();
	useCorrectUserType('caregiver');

	return <Route {...props} />;
};

export default CaregiverRoute;
