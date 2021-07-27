export default ({ MedicationService }) => ({
  create: async (req, res) => {
    const { body: { name, sideEffects } } = req;

    res.json(await MedicationService.create({ name, sideEffects }));
  },
  getAll: async (req, res) => {
    res.json(await MedicationService.getAll());
  },
  get: async (req, res) => {
    const { params: { medicationId } } = req;

    res.json(await MedicationService.get(medicationId));
  },
  update: async (req, res) => {
    const { params: { medicationId: id }, body: { name, sideEffects } } = req;

    res.json(await MedicationService.update({ id, name, sideEffects }));
  },
  delete: async (req, res) => {
    const { params: { medicationId } } = req;

    res.json(await MedicationService.delete(medicationId));
  },
});
