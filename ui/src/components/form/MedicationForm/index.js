import React from 'react';

import { TextField, GenericFormStructure } from 'components/form';

const MedicationForm = () => (
  <GenericFormStructure
    fields={[
      <TextField name="name" label="Medication Name" />,
      <TextField name="sideEffects" label="Side Effects" />
    ]}
  />
);

export default MedicationForm;
