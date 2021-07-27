export default ({
  constants: { PATIENT, CAREGIVER, DOCTOR },
  PatientRepository,
  CaregiverRepository,
  DoctorRepository,
  ErrorService: { throwConflictError },
}) => ({
  create: async (type, userBody, restBody) => {
    const { email } = userBody;

    switch (type) {
      case PATIENT:
        return await PatientRepository.create(userBody, restBody);
      case CAREGIVER:
        return await CaregiverRepository.create(userBody, restBody);
      case DOCTOR:
        return await DoctorRepository.create(userBody, restBody);
      default:
        return null;
    }
  },
  me: async loggedUser => {
    const { userType, userId } = loggedUser;

    switch (userType) {
      case PATIENT:
        return await PatientRepository.getByUserId(userId);
      case CAREGIVER:
        return await CaregiverRepository.getByUserId(userId);
      case DOCTOR:
        return await DoctorRepository.getByUserId(userId);
      default:
        return null;
    }
  },
});
