// packages
import Head from 'next/head';
import { Fragment } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
// components
import InputField from '@/components/InputField';
// store
import { updatePassword } from '@/store/slices/account';
import { getAccountPassword } from '@/store/selectors/account';
// utils
import { comparePassword, hashPassword } from '@/utils/auth';


// types
type InitialValues = {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
};

const initialValues: InitialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
};

const validationSchema = Yup.object({
    currentPassword: Yup.string()
        .required('Please enter current password'),
    newPassword: Yup.string()
        .required('Please enter new password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords does not match')
        .required('Please enter confirm password')
});

// change password page component
const ChangePassword = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const currentPassword = useSelector(getAccountPassword);

    /**
     * 1. Change password functionality based on static data.
     * 2. Backend functionality is not implemented, so the data will not persist in real time.
     * 3. If desired, backend functionality can be added to enable real-time data updates.
     */
    // handle change password
    const onSubmit = async (values: InitialValues, { setFieldError }: { setFieldError: any }) => {
        if (!currentPassword) return;

        const isPasswordMatched = await comparePassword(values.currentPassword, currentPassword);

        if (!isPasswordMatched) {
            setFieldError('currentPassword', 'Please enter correct password.');
            return;
        }

        const hashedPassword = await hashPassword(values.newPassword);
        dispatch(updatePassword(hashedPassword));
        // after changing password redirect to home page
        router.push('/');
    }

    return (
        <Fragment>
            <Head>
                <title>Change Password</title>
            </Head>

            <div className="row" id="myAccount">
                <div className="col-lg-6 first-team-form-box">
                    <div className="new-teams-main-box">
                        <div className="login-title-box">
                            <div className="res-x-btn">
                                <button>X</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {() => (
                                        <Form>
                                            <div className="account-box">
                                                <InputField
                                                    label='Current Password'
                                                    name='currentPassword'
                                                    id='currentPassword'
                                                    className='search-area'
                                                    placeholder='Enter your current Password...'
                                                />
                                                <InputField
                                                    label='New Password'
                                                    name='newPassword'
                                                    id='newPassword'
                                                    className='search-area'
                                                    placeholder='Enter your new Password...'
                                                />
                                                <InputField
                                                    label='Confirm Password'
                                                    name='confirmPassword'
                                                    id='confirmPassword'
                                                    className='search-area'
                                                    placeholder='Enter your confirm Password...'
                                                />
                                            </div>

                                            <div className="buttons">
                                                <button className="star-btn next_button" type='submit'>Save</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ChangePassword;