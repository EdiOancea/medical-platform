export default ({ MedicationRepository }) => ({
  create: async body => await MedicationRepository.create(body),
  get: async id => await MedicationRepository.get(id),
  getAll: async () => await MedicationRepository.getAll(),
  update: async body => {
    const { id } = body;
    await MedicationRepository.update(body);

    return await MedicationRepository.get(id);
  },
  delete: async id => await MedicationRepository.delete(id),
});
