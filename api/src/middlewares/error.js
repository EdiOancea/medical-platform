export default () => (err, _req, res, _next) => {
  if (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
