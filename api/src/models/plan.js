module.exports = (sequelize, DataTypes) => {
	const Plan = sequelize.define(
		'Plan', {
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
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
		},
    {
			timestamps: false,
			underscored: true,
		},
	);

	Plan.associate = ({ Medication, Patient, MedicationPlan }) => {
    Plan.belongsToMany(Medication, { through: MedicationPlan });
		Plan.hasMany(MedicationPlan, { foreignKey: 'planId', as: 'entries' });
    Plan.belongsTo(Patient, { foreignKey: 'patientId' });
	};

	return Plan;
};
