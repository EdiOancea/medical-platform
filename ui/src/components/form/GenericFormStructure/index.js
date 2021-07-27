import React from 'react';
import { Grid } from '@material-ui/core';

const GenericFormStructure = ({ fields }) => (
  <Grid container spacing={2}>
    {fields.map((field, idx) => (
      <Grid key={idx} item xs={12}>
        {field}
      </Grid>
    ))}
  </Grid>
);

export default GenericFormStructure;
