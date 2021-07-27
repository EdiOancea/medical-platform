import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import GenericFormStructure from 'components/form/GenericFormStructure';
import TextField from 'components/form/TextField';
import FormWrapper from 'components/form/FormWrapper';
import LockAvatar from 'components/icons/Lock';
import { getValidate } from 'utils/form';
import { signIn } from 'actions/auth';

const schema = Yup.object().shape({
	email: Yup.string().email().required('Email is required.'),
	password: Yup.string().required('Password is required.'),
});

const SignInPage = () => {
	const dispatch = useDispatch();
	const submitError = useSelector(state => state.formError.signIn);
	const onSubmit = data => dispatch(signIn(data));
	const validate = getValidate(schema);

	return (
		<FormWrapper
			onSubmit={onSubmit}
			validate={validate}
			title="Sign in"
			submitButton={{ text: 'Sign in' }}
			submitError={submitError}
		>
			<LockAvatar />
			<GenericFormStructure
				fields={[
					<TextField name="email" label="Email Address" autoComplete="email" />,
					<TextField name="password" label="Password" type="password" />,
				]}
			/>
	 	</FormWrapper>
	);
};

export default SignInPage;
