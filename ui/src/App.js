import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import AppBar from 'components/AppBar';
import Alerts from 'containers/Alerts';
import {
	DoctorRoute,
	CaregiverRoute,
	PatientRoute,
	UnprotectedRoute
} from 'containers/routes';
import SignInPage from 'containers/pages/SignInPage';
import DoctorDashboard from 'containers/pages/DoctorDashboard';
import DoctorPatientPage from 'containers/pages/DoctorPatientPage';
import DoctorCaregiverPage from 'containers/pages/DoctorCaregiverPage';
import DoctorPatientPlansPage from 'containers/pages/DoctorPatientPlansPage';
import DoctorPatientPlanPage from 'containers/pages/DoctorPatientPlanPage';
import MedicationPage from 'containers/pages/MedicationPage';
import CaregiverPage from 'containers/pages/CaregiverPage';
import CaregiverPatientPage from 'containers/pages/CaregiverPatientPage';
import CaregiverPatientPlanPage from 'containers/pages/CaregiverPatientPlanPage';
import PatientPage from 'containers/pages/PatientPage';
import PatientPlanPage from 'containers/pages/PatientPlanPage';

const routes = [
	{ RouteType: PatientRoute, path: '/patient/dashboard', Page: PatientPage },
	{ RouteType: PatientRoute, path: '/patient/plans/:planId', Page: PatientPlanPage },

	{ RouteType: CaregiverRoute, path: '/caregiver/dashboard', Page: CaregiverPage },
	{ RouteType: CaregiverRoute, path: '/caregiver/patients/:patientId', Page: CaregiverPatientPage },
	{ RouteType: CaregiverRoute, path: '/caregiver/patients/:patientId/plans/:planId', Page: CaregiverPatientPlanPage },

	{ RouteType: DoctorRoute, path: '/doctor/dashboard', Page: DoctorDashboard },
	{ RouteType: DoctorRoute, path: '/medication', Page: MedicationPage },
	{ RouteType: DoctorRoute, path: '/doctor/caregivers', Page: DoctorCaregiverPage },
	{ RouteType: DoctorRoute, path: '/doctor/patients', Page: DoctorPatientPage },
	{ RouteType: DoctorRoute, path: '/doctor/patients/:patientId', Page: DoctorPatientPlansPage },
	{ RouteType: DoctorRoute, path: '/doctor/patients/:patientId/plans/:planId', Page: DoctorPatientPlanPage },

	{ RouteType: UnprotectedRoute, path: '/signin', Page: SignInPage },
].map(({ RouteType, path, Page}) => (
	<RouteType path={path} exact key={path}><Page /></RouteType>
));

const App = () => (
	<Router>
		<AppBar />
		<Alerts />
		<Switch>
			{routes}
			<UnprotectedRoute path="/">
				<Redirect to="/signin" />
			</UnprotectedRoute>
		</Switch>
	</Router>
);

export default App;
