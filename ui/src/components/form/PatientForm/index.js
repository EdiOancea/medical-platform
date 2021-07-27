import React from 'react';

import {
  TextField,
  SelectField,
  DateField,
  GenericFormStructure,
} from 'components/form';

const PatientForm = ({ isEditMode, caregiverOptions }) => (
  <GenericFormStructure
    fields={[
      ...(!isEditMode
        ? [
          <TextField name="email" label="Email Address" autoComplete="email" />,
          <TextField name="password" label="Password" type="password" />,
        ]
        : []
      ),
      <TextField name="name" label="Patient Name" />,
      <SelectField
        name="gender"
        label="Gender"
        options={[
          { id: 'female', label: 'Female' },
          { id: 'male', label: 'Male' },
        ]}
      />,
      caregiverOptions.length
        ? <SelectField name="caregiverId" label="Caregiver" options={caregiverOptions} />
        : <div>No caregivers available</div>,
      <TextField name="address" label="Address" />,
      <DateField name="birthDate" label="Birth Date" />,
    ]}
  />
);

export default PatientForm;
