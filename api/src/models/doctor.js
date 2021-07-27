import { MALE, FEMALE } from '../constants';

module.exports = (sequelize, DataTypes) => {
	const Doctor = sequelize.define(
		'Doctor', {
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
		}
	);

	Doctor.associate = ({ User }) => {
    Doctor.belongsTo(
			User,
			{ foreignKey: 'userId', allowNull: false, as: 'user' },
		);
	};

	return Doctor;
};
