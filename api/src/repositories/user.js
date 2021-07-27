export default ({ db: { User } }) => ({
  getByEmail: async email => await User.findOne({
    where: { email },
    attributes: { include: 'password' },
  }),
});
