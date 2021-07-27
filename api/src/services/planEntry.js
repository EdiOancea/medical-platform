export default ({ PlanEntryRepository }) => ({
  create: async body => await PlanEntryRepository.create(body),
  update: async body => {
    const { id } = body;
    await PlanEntryRepository.update(body);

    return await PlanEntryRepository.get(id);
  },
  delete: async id => await PlanEntryRepository.delete(id),
});
