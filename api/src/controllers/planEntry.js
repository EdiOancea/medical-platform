export default ({ PlanEntryService }) => ({
  create: async (req, res) => {
    const {
      params: { planId },
      body: { medicationId, dosage, interval, unit }
    } = req;

    res.json(await PlanEntryService.create({
      planId,
      medicationId,
      dosage,
      interval,
      unit,
    }));
  },
  update: async (req, res) => {
    const {
      params: { entryId: id, planId },
      body: { medicationId, dosage, interval, unit },
    } = req;

    res.json(await PlanEntryService.update({
      id,
      planId,
      medicationId,
      dosage,
      interval,
      unit,
    }));
  },
  delete: async (req, res) => {
    const { params: { entryId } } = req;

    res.json(await PlanEntryService.delete(entryId));
  },
});
