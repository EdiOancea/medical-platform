export default ({ constants: { DOCTOR }, UserService }) => ({
  create: async (req, res) => {
    const { body: { email, password, type, ...rest } } = req;

    res.json(await UserService.create(DOCTOR, { email, password }, rest));
  },
});
