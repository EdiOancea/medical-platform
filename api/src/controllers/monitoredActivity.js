export default ({ MonitoredActivityService }) => ({
  create: async (req, res) => {
    const { body: { patientId, activityName, startTime, endTime } } = req;

    res.json(await MonitoredActivityService.create(
      { patientId, activityName, startTime, endTime }
    ));
  },
});
