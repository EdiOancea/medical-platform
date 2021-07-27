export default ({
  constants: { DOCTOR },
  db: { User, Doctor, sequelize },
}) => ({
  create: async (userBody, doctorBody) => (await sequelize.transaction(
    async t => {
      const { id: userId, ...restUser } = await User.create(
        { ...userBody, type: DOCTOR },
        { transaction: t }
      );
      const doctor = await Doctor.create(
        { ...doctorBody, userId },
        { transaction: t }
      );

      return { ...restUser, ...doctor };
    }
  )).dataValues,
  getByUserId: async userId => await Doctor.findOne(
    { where: { userId }, include: { model: User, as: 'user' } },
  ),
  get: async id => await Doctor.findByPk(id),
  update: async body => {
    const { id } = body;

    return await Doctor.update(body, { where: { id } });
  },
  delete: async id => await Doctor.destroy({ where: { id } }),
});
