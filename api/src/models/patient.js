import { MALE, FEMALE } from '../constants';

module.exports = (sequelize, DataTypes) => {
	const Patient = sequelize.define(
		'Patient', {
			id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
			name: {
        type: DataTypes.STRING,
				allowNull: false,
				unique: true,
  			validate: {
  				len: [3, 30],
  			},
			},
      gender: {
        type: DataTypes.STRING,
        validate: {
          isIn:[FEMALE, MALE],
        },
      },
			address: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 128],
        },
      },
      birthDate: DataTypes.DATE,
		},
		{
			timestamps: false,
			underscored: true,
		},
	);

	Patient.associate = ({ User, Caregiver, Plan, MonitoredActivity }) => {
    Patient.belongsTo(
			User,
			{ foreignKey: 'userId', allowNull: false, as: 'user' },
		);
		Patient.belongsTo(
			Caregiver,
			{ foreignKey: 'caregiverId', allowNull: false, as: 'caregiver' },
		);
		Patient.hasMany(Plan, { foreignKey: 'patientId', as: 'plans' });
		Patient.hasMany(MonitoredActivity, { foreignKey: 'patientId', as: 'monitoredActivities' });
	};

	return Patient;
};
