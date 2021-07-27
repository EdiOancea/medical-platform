import React from 'react';

import { TextField, DateField, GenericFormStructure } from 'components/form';

const PlanForm = () => (
  <GenericFormStructure
    fields={[
      <TextField name="name" label="Name" />,
      <DateField name="startDate" label="Start Date" />,
      <DateField name="endDate" label="End Date" />,
    ]}
  />
);

export default PlanForm;
