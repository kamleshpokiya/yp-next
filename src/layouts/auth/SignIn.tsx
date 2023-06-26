// packages
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// components
import InputField from '@/components/InputField';
// store
import { handleSingnIn } from '@/store/slices/account';
import { getAccountEmail, getAccountPassword } from '@/store/selectors/account';
// utils
import { comparePassword } from '@/utils/auth';


// types
type InitialValues = {
    email: string,
    password: string,
};

type SignInProps = {
    onSignUp: () => void,
};

const MAX_WIDTH = 380;

const initialValues: InitialValues = {
    email: 'test@gmail.com',
    password: '12345678',
};

const validationSchema = Yup.object({
    email: Yup.string().email('Please enter a valid email address.').required('Please enter your email address.'),
    password: Yup.string()
        .required('Please enter your password.'),
});

// sign in component
const SignIn = ({ onSignUp }: SignInProps) => {
    const email = useSelector(getAccountEmail);
    const password = useSelector(getAccountPassword);
    const dispatch = useDispatch();

    /**
     *  1. The sign-in functionality relies on static data for authentication.
     *  2. To implement this functionality with real users, backend functionality needs to be added.
    */
    // handle sign in
    const onSubmit = async (values: InitialValues, { setFieldError }: { setFieldError: any }) => {
        if (email === values.email) {
            if (password) {
                const isPasswordMatched = await comparePassword(values.password, password);

                if (isPasswordMatched) {
                    dispatch(handleSingnIn({
                        isLoggedIn: true,
                    }));
                } else {
                    setFieldError('password', 'Please enter the correct password.');
                }
            }
        } else {
            setFieldError('email', 'We could not find an account associated with that email address');
        }
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
                        <h3>Sign In</h3>
                    </div>

                    <div className="account-box">
                        <InputField
                            label='Email'
                            name='email'
                            id='email'
                            className='search-area'
                            placeholder='Enter your email address...'
                        />
                        <InputField
                            label='Password'
                            name='password'
                            id='password'
                            type='password'
                            className='search-area'
                            placeholder='Enter your Password...'
                        />
                    </div>

                    <div className='input' style={{ marginTop: '-15px', fontSize: '14px' }}>
                        <p>
                            Don&apos;t have an account?
                            <Link href="#" onClick={() => onSignUp()}>
                                {' '}  Sign up here
                            </Link>
                        </p>
                    </div>

                    <div className="buttons">
                        <button className="star-btn next_button" type='submit'>Sign In</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SignIn;