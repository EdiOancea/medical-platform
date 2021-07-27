export default ({ db: { MonitoredActivity }}) => ({
  create: async body => await MonitoredActivity.create(body),
});
