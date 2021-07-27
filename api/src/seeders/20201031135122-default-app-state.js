'use strict';
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');

// easier to index from 1
const generateUUIDs = size => (new Array(size + 1)).fill(0).map(() => v4());

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const medicationIds = generateUUIDs(5);
    await queryInterface.bulkInsert('medication', [
      {
        id: medicationIds[1],
        name: 'Medicament1',
        side_effects: 'Efecte secundare 1',
      },
      {
        id: medicationIds[2],
        name: 'Medicament2',
        side_effects: 'Efecte secundare 2',
      },
      {
        id: medicationIds[3],
        name: 'Medicament3',
        side_effects: 'Efecte secundare 3',
      },
      {
        id: medicationIds[4],
        name: 'Medicament4',
        side_effects: 'Efecte secundare 4',
      },
      {
        id: medicationIds[5],
        name: 'Medicament5',
        side_effects: '',
      },
    ]);

    const userIds = generateUUIDs(3);
    await queryInterface.bulkInsert('users', [
      {
        id: userIds[1],
        email: 'doctor1@gmail.com',
        password: bcrypt.hashSync('123123123123', 10),
        type: 'doctor',
      },
      {
        id: userIds[2],
        email: 'caregiver1@gmail.com',
        password: bcrypt.hashSync('123123123123', 10),
        type: 'caregiver',
      },
      {
        id: userIds[3],
        email: 'patient1@gmail.com',
        password: bcrypt.hashSync('123123123123', 10),
        type: 'patient',
      },
    ]);

    const doctorIds = generateUUIDs(1);
    await queryInterface.bulkInsert('doctors', [
      {
        id: doctorIds[1],
        name: 'Doctor1',
        gender: 'male',
        address: 'Address1',
        birth_date: new Date(),
        user_id: userIds[1],
      }
    ]);

    const caregiverIds = generateUUIDs(1);
    await queryInterface.bulkInsert('caregivers', [
      {
        id: caregiverIds[1],
        name: 'Caregiver1',
        gender: 'female',
        address: 'Address2',
        birth_date: new Date(),
        user_id: userIds[2],
      }
    ]);

    const patientIds = generateUUIDs(1);
    await queryInterface.bulkInsert('patients', [
      {
        id: patientIds[1],
        name: 'Patient1',
        gender: 'male',
        address: 'Address3',
        birth_date: new Date(),
        user_id: userIds[3],
        caregiver_id: caregiverIds[1],
      },
    ]);

    const planIds = generateUUIDs(1);
    await queryInterface.bulkInsert('plans', [
      {
        id: planIds[1],
        name: 'Plan1',
        start_date: new Date(),
        end_date: new Date(),
        patient_id: patientIds[1],
      },
    ]);

    const medicationPlanIds = generateUUIDs(1);
    await queryInterface.bulkInsert('medication_plans', [
      {
        id: medicationPlanIds[1],
        plan_id: planIds[1],
        medication_id: medicationIds[1],
        dosage: 3,
        unit: 'mcg',
        interval: 24,
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('medication_plans', {}, {});
    await queryInterface.bulkDelete('plans', {}, {});
    await queryInterface.bulkDelete('patients', {}, {});
    await queryInterface.bulkDelete('caregivers', {}, {});
    await queryInterface.bulkDelete('doctors', {}, {});
    await queryInterface.bulkDelete('users', {}, {});
    await queryInterface.bulkDelete('medication', {}, {});
  }
};
