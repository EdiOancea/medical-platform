import React from 'react';

import {
  TextField,
  SelectField,
  DateField,
  GenericFormStructure,
} from 'components/form';

const CaregiverForm = ({ isEditMode }) => (
  <GenericFormStructure
    fields={[
      ...(!isEditMode
        ? [
          <TextField name="email" label="Email Address" autoComplete="email" />,
          <TextField name="password" label="Password" type="password" />
        ]
        : []
      ),
      <TextField name="name" label="Caregiver Name" />,
      <SelectField
        name="gender"
        label="Gender"
        options={[
          { id: 'female', label: 'Female' },
          { id: 'male', label: 'Male' },
        ]}
      />,
      <TextField name="address" label="Address" />,
      <DateField name="birthDate" label="Birth Date" />,
    ]}
  />
);

export default CaregiverForm;
