export default ({ PatientService }) => ({
  create: async (req, res) => {
    const {
      body: {
        email,
        password,
        name,
        birthDate,
        gender,
        address,
        caregiverId,
      },
    } = req;

    res.json(await PatientService.create(
      { email, password },
      { name, gender, address, birthDate, caregiverId }
    ))
  },
  get: async (req, res) => {
    const { params: { patientId } } = req;

    res.json(await PatientService.get(patientId));
  },
  getAll: async (req, res) => {
    const { loggedUser } = req;
    res.json(await PatientService.getAll({ loggedUser }));
  },
  update: async (req, res) => {
    const {
      params: { patientId: id },
      body: { name, gender, address, birthDate, caregiverId },
    } = req;

    res.json(await PatientService.update(
      { id, name, gender, address, birthDate, caregiverId }
    ));

  },
  delete: async (req, res) => {
    const { params: { patientId } } = req;

    res.json(await PatientService.delete(patientId));
  },
});
