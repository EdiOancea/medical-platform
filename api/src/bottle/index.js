import Bottle from 'bottlejs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import * as constants from '../constants';
import db from '../models';
import app from '../app';
import routes from '../routes';

import AuthController from '../controllers/auth';
import CaregiverController from '../controllers/caregiver';
import DoctorController from '../controllers/doctor';
import MedicationController from '../controllers/medication';
import MonitoredActivityController from '../controllers/monitoredActivity';
import PatientController from '../controllers/patient';
import PlanController from '../controllers/plan';
import PlanEntryController from '../controllers/planEntry';
import UserController from '../controllers/user';

import AuthMiddleware from '../middlewares/auth';
import DoctorMiddleware from '../middlewares/doctor';
import ErrorMiddleware from '../middlewares/error';

import CaregiverRepository from '../repositories/caregiver';
import DoctorRepository from '../repositories/doctor';
import MedicationRepository from '../repositories/medication';
import MonitoredActivityRepository from '../repositories/monitoredActivity';
import PatientRepository from '../repositories/patient';
import PlanRepository from '../repositories/plan';
import PlanEntryRepository from '../repositories/planEntry';
import UserRepository from '../repositories/user';

import AuthService from '../services/auth';
import CaregiverService from '../services/caregiver';
import ErrorService from '../services/error';
import MedicationService from '../services/medication';
import MonitoredActivityService from '../services/monitoredActivity';
import PatientService from '../services/patient';
import PlanService from '../services/plan';
import PlanEntryService from '../services/planEntry';
import UserService from '../services/user';

const bottle = new Bottle();

bottle.factory('jwt', () => jwt);
bottle.factory('bcrypt', () => bcrypt);
bottle.factory('constants', () => constants);

bottle.factory('routes', routes);
bottle.factory('app', app);
bottle.factory('db', db);

bottle.factory('AuthController', AuthController);
bottle.factory('CaregiverController', CaregiverController);
bottle.factory('DoctorController', DoctorController);
bottle.factory('MedicationController', MedicationController);
bottle.factory('MonitoredActivityController', MonitoredActivityController);
bottle.factory('PatientController', PatientController);
bottle.factory('PlanController', PlanController);
bottle.factory('PlanEntryController', PlanEntryController);
bottle.factory('UserController', UserController);

bottle.factory('AuthMiddleware', AuthMiddleware);
bottle.factory('DoctorMiddleware', DoctorMiddleware);
bottle.factory('ErrorMiddleware', ErrorMiddleware);

bottle.factory('CaregiverRepository', CaregiverRepository);
bottle.factory('DoctorRepository', DoctorRepository);
bottle.factory('MedicationRepository', MedicationRepository);
bottle.factory('MonitoredActivityRepository', MonitoredActivityRepository);
bottle.factory('PatientRepository', PatientRepository);
bottle.factory('PlanRepository', PlanRepository);
bottle.factory('PlanEntryRepository', PlanEntryRepository);
bottle.factory('UserRepository', UserRepository);

bottle.factory('AuthService', AuthService);
bottle.factory('CaregiverService', CaregiverService);
bottle.factory('ErrorService', ErrorService);
bottle.factory('MedicationService', MedicationService);
bottle.factory('MonitoredActivityService', MonitoredActivityService);
bottle.factory('PatientService', PatientService);
bottle.factory('PlanService', PlanService);
bottle.factory('PlanEntryService', PlanEntryService);
bottle.factory('UserService', UserService);

export default bottle;
