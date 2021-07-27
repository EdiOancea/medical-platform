export default ({
  constants: { PATIENT },
  db: { User, Patient, Caregiver, sequelize },
}) => ({
  create: async (userBody, patientBody) => (
    await sequelize.transaction(
      async t => {
        const { id: userId, ...restUser } = await User.create(
          { ...userBody, type: PATIENT },
          { transaction: t }
        );
        const patient = await Patient.create(
          { ...patientBody, userId },
          { transaction: t }
        );

        return { ...restUser, ...patient };
      }
    )
  ).dataValues,
  getByUserId: async userId => await Patient.findOne(
    { where: { userId }, include: { model: User, as: 'user' } },
  ),
  getAll: async () => await Patient.findAll(),
  getAllByCaregiverId: async caregiverId => await Patient.findAll({ where: { caregiverId } }),
  get: async id => await Patient.findByPk(id),
  update: async body => {
    const { id } = body;

    return await Patient.update(body, { where: { id } });
  },
  delete: async id => await Patient.destroy({ where: { id } }),
});
