export default ({ UserService }) => ({
  create: async (req, res) => {
    const { body: { email, password, type, ...rest } } = req;

    res.json(await UserService.create(type, { email, password }, rest));
  },
  me: async (req, res) => {
    const { loggedUser } = req;

    res.json(await UserService.me(loggedUser));
  },
});
