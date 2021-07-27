export default ({
  AuthController,
  CaregiverController,
  DoctorController,
  MedicationController,
  MonitoredActivityController,
  PatientController,
  PlanController,
  PlanEntryController,
  UserController,
}) => ({
  doctorOnly: [
    { route: '/caregivers', method: 'post', callback: CaregiverController.create },
    { route: '/caregivers', method: 'get', callback: CaregiverController.getAll },
    { route: '/caregivers/:caregiverId', method: 'get', callback: CaregiverController.get },
    { route: '/caregivers/:caregiverId', method: 'put', callback: CaregiverController.update },
    { route: '/caregivers/:caregiverId', method: 'delete', callback: CaregiverController.delete },

    { route: '/patients', method: 'post', callback: PatientController.create },
    { route: '/patients/:patientId', method: 'get', callback: PatientController.get },
    { route: '/patients/:patientId', method: 'put', callback: PatientController.update },
    { route: '/patients/:patientId', method: 'delete', callback: PatientController.delete },

    { route: '/patients/:patientId/plans', method: 'post', callback: PlanController.create },
    { route: '/patients/:patientId/plans/:planId', method: 'put', callback: PlanController.update },
    { route: '/patients/:patientId/plans/:planId', method: 'delete', callback: PlanController.delete },

    { route: '/patients/:patientId/plans/:planId/entries', method: 'post', callback: PlanEntryController.create },
    { route: '/patients/:patientId/plans/:planId/entries/:entryId', method: 'put', callback: PlanEntryController.update },
    { route: '/patients/:patientId/plans/:planId/entries/:entryId', method: 'delete', callback: PlanEntryController.delete },

    { route: '/medication', method: 'post', callback: MedicationController.create },
    { route: '/medication/:medicationId', method: 'get', callback: MedicationController.get },
    { route: '/medication/:medicationId', method: 'put', callback: MedicationController.update },
    { route: '/medication/:medicationId', method: 'delete', callback: MedicationController.delete },
  ],
  authenticated: [
    { route: '/users/me', method: 'get', callback: UserController.me },
    { route: '/patients/:patientId/plans', method: 'get', callback: PlanController.getAll },
    { route: '/patients/:patientId/plans/:planId', method: 'get', callback: PlanController.get },
    { route: '/medication', method: 'get', callback: MedicationController.getAll },
    { route: '/patients', method: 'get', callback: PatientController.getAll },
  ],
  unAuthenticated: [
    { route: '/signin', method: 'post', callback: AuthController.signIn },
    // only temporary
    { route: '/doctors', method: 'post', callback: DoctorController.create },
    { route: '/monitoredActivities', method: 'post', callback: MonitoredActivityController.create },
  ],
});
