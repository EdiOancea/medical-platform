export const setFormError = (path, error) => ({
	type: 'SET_FORM_ERROR',
	path,
	error,
});

export const clearFormError = path => ({
	type: 'CLEAR_FORM_ERROR',
	path,
});
