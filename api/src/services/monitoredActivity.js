export default ({ MonitoredActivityRepository }) => ({
  create: async body => await MonitoredActivityRepository.create(body),
});
