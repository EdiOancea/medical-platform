module.exports = (sequelize, DataTypes) => {
	const MedicationPlan = sequelize.define(
		'MedicationPlan', {
			id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      dosage: DataTypes.INTEGER,
      unit: DataTypes.STRING,
			interval: DataTypes.INTEGER,
		},
    {
      timestamps: false,
      underscored: true,
    },
	);

	MedicationPlan.associate = ({ Plan, Medication }) => {
		MedicationPlan.belongsTo(Plan, { foreignKey: 'planId' });
		MedicationPlan.belongsTo(Medication, { foreignKey: 'medicationId' });
	}

	return MedicationPlan;
};
