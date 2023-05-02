// packages
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// components
import InputField from '@/components/InputField';
// store
import { RootState } from '@/store/rootReducer';
import { handleSingnIn } from '@/store/slices/account';
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
    email: '',
    password: '',
};

const validationSchema = Yup.object({
    email: Yup.string().email('Please enter valid email address').required('Please enter your email address'),
    password: Yup.string()
        .required('Please enter new password'),
});

const SignIn = ({ onSignUp }: SignInProps) => {
    const email = useSelector((state: RootState) => state.account.email);
    const password = useSelector((state: RootState) => state.account.password);
    const dispatch = useDispatch();

    const onSubmit = async (values: InitialValues, { setFieldError }: { setFieldError: any }) => {
        if (email === values.email) {
            if (password) {
                const isPasswordMatched = await comparePassword(values.password, password);

                if (isPasswordMatched) {
                    dispatch(handleSingnIn({
                        isLoggedIn: true,
                    }));
                } else {
                    setFieldError('password', 'Please enter correct password');
                }
            }
        } else {
            setFieldError('email', 'Email does not exist');
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