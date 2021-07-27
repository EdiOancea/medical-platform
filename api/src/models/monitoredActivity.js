module.exports = (sequelize, DataTypes) => {
	const MonitoredActivity = sequelize.define(
		'MonitoredActivity', {
			id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      activityName: DataTypes.STRING,
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE
		},
    {
			timestamps: false,
      underscored: true,
    },
	);

	MonitoredActivity.associate = ({ Patient }) => {
		MonitoredActivity.belongsTo(
      Patient,
      { foreignKey: 'patientId', allowNull: false, as: 'patient' }
    );
	};

	return MonitoredActivity;
};
