module.exports = (sequelize, DataTypes) => {
	const Medication = sequelize.define(
		'Medication', {
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
      sideEffects: DataTypes.STRING,
		},
    {
			timestamps: false,
      underscored: true,
      tableName: 'medication',
    },
	);

	Medication.associate = ({ Plan, MedicationPlan }) => {
    Medication.belongsToMany(Plan, { through: MedicationPlan });
		Medication.hasMany(MedicationPlan, { foreignKey: 'medicationId' });
	};

	return Medication;
};
