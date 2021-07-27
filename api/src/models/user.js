import bcrypt from 'bcrypt';
import { DOCTOR, CAREGIVER, PATIENT } from '../constants';

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User', {
			id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [6, 70],
				},
			},
			type: {
				type: DataTypes.STRING,
				validate: {
					isIn: [[DOCTOR, CAREGIVER, PATIENT]],
				},
			}
		}, {
			timestamps: false,
			underscored: true,
			defaultScope: {
				attributes: {
					exclude: ['password'],
				},
			},
		}
	);

  User.beforeCreate(user => {
		user.password = bcrypt.hashSync(user.password, 10);
		user.email = user.email.toLowerCase();
	});

	return User;
};
