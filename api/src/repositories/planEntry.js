export default ({ db: { MedicationPlan }}) => ({
  create: async body => await MedicationPlan.create(body),
  get: async id => await MedicationPlan.findByPk(id),
  update: async body => {
    const { id } = body;

    return await MedicationPlan.update(body, { where: { id } });
  },
  delete: async id => await MedicationPlan.destroy({ where: { id } }),
});
