export default ({ db: { Medication }}) => ({
  create: async body => await Medication.create(body),
  get: async id => await Medication.findByPk(id),
  getAll: async () => await Medication.findAll(),
  update: async body => {
    const { id } = body;

    return await Medication.update(body, { where: { id } });
  },
  delete: async id => await Medication.destroy({ where: { id } }),
});
