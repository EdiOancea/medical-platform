export default ({ CaregiverRepository }) => ({
  create: async (userBody, caregiverBody) => await CaregiverRepository.create(
    userBody,
    caregiverBody
  ),
  get: async id => await CaregiverRepository.get(id),
  getAll: async () => await CaregiverRepository.getAll(),
  update: async body => {
    const { id } = body;
    await CaregiverRepository.update(body);

    return await CaregiverRepository.get(id);
  },
  delete: async id => await CaregiverRepository.delete(id),
});
