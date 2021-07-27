export default ({ db: { Plan, MedicationPlan }}) => ({
  create: async body => await Plan.create(body),
  getAll: async patientId => await Plan.findAll({
    where: { patientId }
  }),
  get: async patientId => (await Plan.findByPk(
    patientId,
    { include: { model: MedicationPlan, as: 'entries' } },
  )).dataValues,
  update: async body => {
    const { id } = body;

    return await Plan.update(body, { where: { id } });
  },
  delete: async id => await Plan.destroy({ where: { id } }),
});
