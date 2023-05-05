// packages
import Head from 'next/head';
import { Fragment } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// sections
import TeamAvatar from '@/sections/teams/TeamAvatar';
// components
import InputField from '@/components/InputField';
import TextArea from '@/components/TextArea';
// types
import { Account } from '@/types';
// store
import { updateAccount } from '@/store/slices/account';
import { getAccount } from '@/store/selectors/account';


const validationSchema = Yup.object({
    firstName: Yup.string().required('Please enter your first name'),
    lastName: Yup.string().required('Please enter your last name'),
    mobileNumber: Yup.string().required('Please enter your mobile number'),
    email: Yup.string().email('Please enter valid email address').required('Please enter your email address'),
    address: Yup.string().required('Please enter your address'),
});

const MyAccount = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const initialValues = useSelector(getAccount);

    const onSubmit = (values: Account) => {
        dispatch(updateAccount(values));
        router.push('/');
    }

    return (
        <Fragment>
            <Head>
                <title>My Account</title>
            </Head>

            <div className="row" id="myAccount">
                <div className="col-lg-6 first-team-form-box">
                    <div className="new-teams-main-box">
                        <div className="login-title-box">
                            <h3>Personal details</h3>
                            <div className="res-x-btn">
                                <button>X</button>
                            </div>
                        </div>
                        <div className="row">
                            <TeamAvatar isDefaultAvatarImage />
                            <div className="col-md-8">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {() => (
                                        <Form>
                                            <div className="account-box">
                                                <div className="row">
                                                    <InputField
                                                        label='First Name'
                                                        name='firstName'
                                                        id='firstName'
                                                        type='text'
                                                        placeholder='Enter your first name...'
                                                        className='search-area'
                                                        divClasses='col-lg-6'
                                                    />
                                                    <InputField
                                                        label='Last Name'
                                                        name='lastName'
                                                        id='lastName'
                                                        type='text'
                                                        placeholder='Enter your last name...'
                                                        className='search-area'
                                                        divClasses='col-lg-6'
                                                    />
                                                </div>

                                                <div className="row">
                                                    <InputField
                                                        label='Mobile Number'
                                                        name='mobileNumber'
                                                        id='mobileNumber'
                                                        type='number'
                                                        placeholder='Enter your mobile number...'
                                                        className='search-area'
                                                        divClasses='col-lg-6'
                                                    />
                                                    <InputField
                                                        label='E-mail'
                                                        name='email'
                                                        id='email'
                                                        type='email'
                                                        placeholder='Enter your email address...'
                                                        className='search-area'
                                                        divClasses='col-lg-6'
                                                    />
                                                </div>

                                                <TextArea
                                                    label='Address'
                                                    name='address'
                                                    id='address'
                                                    cols={30}
                                                    rows={10}
                                                    placeholder='Please enter your Address...'
                                                    className='search-area'
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

export default MyAccount;