export const getValidate = validationSchema => values => {
  try {
    validationSchema.validateSync(
      values,
      { abortEarly: false, context: { values } },
    );
  } catch (err) {
    return err.inner.reduce((errors, { path, message }) => ({
      ...errors,
      [path]: errors[path] ? `${errors[path]}. ${message}` : message,
    }), {});
  }

  return true;
};
