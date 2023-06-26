// packages
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components
import InputField from '@/components/InputField';
import SearchBox from '@/components/SelectField';
// _mock
import designations from '@/_mock/designations';
// store
import { addMember, updateMember } from '@/store/slices/members';
import { RootState } from '@/store/rootReducer';
import { getMemberById } from '@/store/selectors/members';
import { onEmployeeTabChanage } from '@/store/slices/actions';
import { getEditMemberId, getIsSidePanelOpen } from '@/store/selectors/actions';


// types
type InitialValues = {
    name: string,
    email: string,
    designation: string | Option,
};

type Option = {
    id: string,
    label: string,
    value: string,
};

const initialValues: InitialValues = {
    name: '',
    email: '',
    designation: '',
};

const validationSchema = Yup.object({
    name: Yup.string().required('Please enter employee name.'),
    email: Yup.string().email('Please enter a valid email address.').required('Please enter employee email address.'),
    designation: Yup.object().required('Please select employee role.'),
});

// form component : add and update employee
const Form = () => {
    const dispatch = useDispatch();
    const editMemberId = useSelector(getEditMemberId);
    const member = useSelector((state: RootState) => getMemberById(state, editMemberId));
    const isSidePanelOpen = useSelector(getIsSidePanelOpen);

    // formate member
    const formatedMember = () => {
        if (!member) return null;
        return {
            ...member,
            designation: {
                id: member?.designation,
                label: member?.designation,
                value: member?.designation
            }
        }
    };

    // form actions
    const action: string = member ? 'Update' : 'Add';
    const values: InitialValues = formatedMember() ?? initialValues;

    // handle add/update member
    const handleSubmit = (values: InitialValues) => {
        if (member) {
            dispatch(updateMember(values));
        } else {
            dispatch(addMember(values));
        }

        dispatch(onEmployeeTabChanage('employees'));
    }

    // formated designations
    const formatedDesignations: Option[] = designations.map((designation) => ({
        id: designation,
        label: designation,
        value: designation,
    }));

    return (
        <div className="tab-pane fade active show" id="v-pills-settings" role="tabpanel"
            aria-labelledby="v-pills-settings-tab">
            <div className={`padding-box ${isSidePanelOpen ? 'pdlb' : ''}`}>
                <div className="row">
                    <div className="card col-lg-6">
                        <div className="login-title-box">
                            <h1>{action} Employee</h1>
                        </div>
                        <Formik
                            initialValues={values}
                            validationSchema={validationSchema}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            {({ values, setFieldValue, setFieldTouched, touched, errors }) => (
                                <FormikForm>
                                    <div className="main active">
                                        <div className=" login-account">
                                            <div className="login-form">
                                                <div className="account-box">
                                                    <div className="input-main-box">
                                                        <InputField
                                                            label="Name:"
                                                            name="name"
                                                            id="name"
                                                            type="text"
                                                            value={values.name}
                                                            placeholder="Enter employee name her..."
                                                        />

                                                        <div className="input-box input comment">
                                                            <label>Role:</label>
                                                            <SearchBox
                                                                value={values.designation}
                                                                onChange={(selected: Option) => setFieldValue('designation', selected)}
                                                                onBlur={() => setFieldTouched('designation', true)}
                                                                options={formatedDesignations}
                                                                getOptionLabel={(option: Option) => option.value}
                                                                placeholder='Select employee role'
                                                                maxWidth='50%'
                                                                showIcon={false}
                                                            />
                                                            {touched.designation && errors.designation ? (
                                                                <div className="error-msg">{errors.designation}</div>
                                                            ) : null}
                                                        </div>

                                                        <InputField
                                                            label="Email:"
                                                            name="email"
                                                            id="email"
                                                            type="email"
                                                            value={values.email}
                                                            placeholder="Enter employee email her..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="buttons">
                                            <button className="star-btn next_button" type='submit'>{action}</button>
                                        </div>
                                    </div>
                                </FormikForm>
                            )}
                        </Formik>
                    </div>
                    <div className="col-lg-6" />
                </div>
            </div>
        </div>
    );
};

export default Form;
