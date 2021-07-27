import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

export default ({
	routes: { authenticated, unAuthenticated, doctorOnly },
	db,
	AuthMiddleware,
	ErrorMiddleware,
	DoctorMiddleware,
}) => {
	const app = express();
	app.use(bodyParser.json());
	app.use(cors());
	const handleRoute = ({ route, method, callback }) => {
		app[method](route, (req, res, next) => callback(req, res, next).catch(next));
	};

	unAuthenticated.forEach(handleRoute);
	app.use(AuthMiddleware);
	authenticated.forEach(handleRoute);
	app.use(DoctorMiddleware);
	doctorOnly.forEach(handleRoute);
	app.use(ErrorMiddleware);
	return app;
};
