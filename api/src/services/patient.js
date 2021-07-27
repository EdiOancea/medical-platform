export default ({
  constants: { PATIENT, CAREGIVER },
  PatientRepository,
  CaregiverRepository,
  ErrorService: { throwAuthorizationError },
}) => ({
  create: async (userBody, patientBody) => await PatientRepository.create(
    userBody,
    patientBody
  ),
  get: async id => await PatientRepository.get(id),
  getAll: async context => {
    const { loggedUser: { userId, userType } } = context;

    if (userType === PATIENT) {
      throwAuthorizationError();
    }

    if (userType === CAREGIVER) {
      const { id } = await CaregiverRepository.getByUserId(userId);

      return await PatientRepository.getAllByCaregiverId(id);
    }

    return await PatientRepository.getAll();
  },
  update: async body => {
    const { id } = body;
    await PatientRepository.update(body);

    return await PatientRepository.get(id);
  },
  delete: async id => await PatientRepository.delete(id),
});
