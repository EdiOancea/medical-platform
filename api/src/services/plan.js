export default ({
  constants: { CAREGIVER, PATIENT },
  PatientRepository,
  CaregiverRepository,
  PlanRepository,
  ErrorService: { throwAuthorizationError },
}) => ({
  create: async body => await PlanRepository.create(body),
  getAll: async (patientId, context) => {
    const { loggedUser: { userId, userType } } = context;
    const patient = await PatientRepository.get(patientId);

    if (userType === PATIENT && patient.userId !== userId) {
      throwAuthorizationError();
    }

    if (userType === CAREGIVER) {
      const { id } = await CaregiverRepository.getByUserId(userId);

      if (id !== patient.caregiverId) {
        throwAuthorizationError();
      }
    }

    return await PlanRepository.getAll(patientId)
  },
  get: async (planId, context) => {
    const { loggedUser: { userId, userType }, patientId } = context;
    const patient = await PatientRepository.get(patientId);
    const plan = await PlanRepository.get(planId);

    if (plan.patientId !== patientId) {
      throwAuthorizationError();
    }

    if (userType === PATIENT && patient.userId !== userId) {
      throwAuthorizationError();
    }

    if (userType === CAREGIVER) {
      const { id } = await CaregiverRepository.getByUserId(userId);

      if (id !== patient.caregiverId) {
        throwAuthorizationError();
      }
    }

    return plan;
  },
  update: async body => {
    const { id } = body;
    await PlanRepository.update(body);

    return await PlanRepository.get(id);
  },
  delete: async planId => PlanRepository.delete(planId),
});
