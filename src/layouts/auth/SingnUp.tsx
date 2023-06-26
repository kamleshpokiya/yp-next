// packages
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
// components
import InputField from '@/components/InputField';
// utils
import { hashPassword } from '@/utils/auth';
// store
import { handleSingnUp } from '@/store/slices/account';


// types
type InitialValues = {
    email: string,
    newPassword: string,
    confirmPassword: string,
};

type SignUpProps = {
    onSignIn: () => void,
};

const MAX_WIDTH = 380;

const initialValues: InitialValues = {
    email: '',
    newPassword: '',
    confirmPassword: '',
};

const validationSchema = Yup.object({
    email: Yup.string().email('Please enter a valid email address.').required('Please enter your email address.'),
    newPassword: Yup.string()
        .required('Please enter new password.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords does not match.')
        .required('Please enter confirm password.')
});

const SignUp = ({ onSignIn }: SignUpProps) => {
    const dispatch = useDispatch();

    /**
     *  1. The sign-up functionality relies on static data for authentication.
     *  2. To implement this functionality with real users, backend functionality needs to be added.
    */
    // handle sign up
    const onSubmit = async (values: InitialValues) => {
        const hashedPassword = await hashPassword(values.newPassword);
        console.log('hashedPassword: ', hashedPassword);
        dispatch(handleSingnUp({
            email: values.email,
            password: hashedPassword,
        }));
        onSignIn();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {() => (
                <Form style={{ width: MAX_WIDTH }}>
                    <div className='input'>
                        <h3>Sign Up</h3>
                    </div>

                    <div className="account-box">
                        <InputField
                            label='Email Address'
                            name='email'
                            id='email'
                            className='search-area'
                            placeholder='Enter your email address...'
                        />
                        <InputField
                            label='New Password'
                            name='newPassword'
                            id='newPassword'
                            type='password'
                            className='search-area'
                            placeholder='Enter your new Password...'
                        />
                        <InputField
                            label='Confirm Password'
                            name='confirmPassword'
                            id='confirmPassword'
                            type='password'
                            className='search-area'
                            placeholder='Enter your confirm Password...'
                        />
                    </div>

                    <div className='input' style={{ marginTop: '-15px', fontSize: '14px' }}>
                        <p>
                            Already have an account?
                            <Link href="#" onClick={() => onSignIn()}>
                                {' '}  Sign in here
                            </Link>
                        </p>
                    </div>

                    <div className="buttons">
                        <button className="star-btn next_button" type='submit'>Sign Up</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SignUp;