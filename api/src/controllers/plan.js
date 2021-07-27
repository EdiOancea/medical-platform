export default ({ PlanService }) => ({
  create: async (req, res) => {
    const { params: { patientId }, body: { name, startDate, endDate } } = req;

    res.json(await PlanService.create({ patientId, name, startDate, endDate }));
  },
  get: async (req, res) => {
    const { loggedUser, params: { patientId, planId } } = req;

    res.json(await PlanService.get(planId, { loggedUser, patientId }));
  },
  getAll: async (req, res) => {
    const { loggedUser, params: { patientId } } = req;

    res.json(await PlanService.getAll(patientId, { loggedUser }));
  },
  update: async (req, res) => {
    const { params: { planId: id }, body: { name, startDate, endDate } } = req;

    res.json(await PlanService.update({ id, name, startDate, endDate }));
  },
  delete: async (req, res) => {
    const { params: { planId } } = req;

    res.json(await PlanService.delete(planId));
  },
});
