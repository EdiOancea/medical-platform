import React from 'react';

import { TextField, SelectField, GenericFormStructure } from 'components/form';

const PlanEntryForm = ({ medicationOptions }) => (
  <GenericFormStructure
    fields={[
      <SelectField
        name="medicationId"
        label="Medication Name"
        options={medicationOptions}
      />,
      <TextField name="dosage" label="Dosage" />,
      <SelectField
        name="unit"
        label="Measurement Unit"
        options={[
          { id: 'mcg', label: 'Micrograms' },
          { id: 'mg', label : 'Milligrams' },
        ]}
      />,
      <TextField name="interval" label="Intake Interval" />,
    ]}
  />
);

export default PlanEntryForm;
