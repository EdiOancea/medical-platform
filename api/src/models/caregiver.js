import { MALE, FEMALE } from '../constants';

module.exports = (sequelize, DataTypes) => {
	const Caregiver = sequelize.define(
		'Caregiver', {
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
          isIn: [[FEMALE, MALE]],
        },
      },
			address: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 128],
        },
      },
      birthDate: DataTypes.DATE,
		}, {
			timestamps: false,
			underscored: true,
		},
	);

	Caregiver.associate = ({ User, Patient }) => {
    Caregiver.belongsTo(
			User,
			{ foreignKey: 'userId', allowNull: false, as: 'user' },
		);
		Caregiver.hasMany(
			Patient,
			{ foreignKey: 'caregiverId', as: 'patients' },
		)
	};

	return Caregiver;
};
