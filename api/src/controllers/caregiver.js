export default ({ CaregiverService }) => ({
  create: async (req, res) => {
    const {
      body: {
        email,
        password,
        name,
        birthDate,
        gender,
        address,
      },
    } = req;

    res.json(await CaregiverService.create(
      { email, password },
      { name, gender, address, birthDate }
    ))
  },
  get: async (req, res) => {
    const { params: { caregiverId } } = req;

    res.json(await CaregiverService.get(caregiverId));
  },
  getAll: async (req, res) => {
    res.json(await CaregiverService.getAll());
  },
  update: async (req, res) => {
    const {
      params: { caregiverId: id },
      body: { name, gender, address, birthDate},
    } = req;

    res.json(await CaregiverService.update(
      { id, name, gender, address, birthDate }
    ));

  },
  delete: async (req, res) => {
    const { params: { caregiverId } } = req;

    res.json(await CaregiverService.delete(caregiverId));
  },
});
