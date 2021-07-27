export default ({
  constants: { CAREGIVER },
  db: { sequelize, User, Caregiver },
}) => ({
  create: async (userBody, caregiverBody) => (await sequelize.transaction(
    async t => {
      const { id: userId, ...restUser } = await User.create(
        { ...userBody, type: CAREGIVER },
        { transaction: t }
      );
      const caregiver = await Caregiver.create(
        { ...caregiverBody, userId },
        { transaction: t }
      );

      return { ...restUser, ...caregiver };
    }
  )).dataValues,
  getByUserId: async userId => (await Caregiver.findOne({
    where: { userId }, include: { model: User, as: 'user' },
  })).dataValues,
  getAll: async () => await Caregiver.findAll(),
  get: async id => await Caregiver.findByPk(id),
  update: async body => {
    const { id } = body;

    return await Caregiver.update(body, { where: { id } });
  },
  delete: async id => await Caregiver.destroy({ where: { id } }),
});
