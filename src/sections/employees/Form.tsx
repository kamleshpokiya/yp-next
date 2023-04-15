import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import InputField from '@/components/InputField';
import { useState } from 'react';
import SearchBox from '@/components/SearchBox';
import designations from '@/_mock/designations';
import { useDispatch, useSelector } from 'react-redux';
import { addMember, updateMember } from '@/store/reducers/membersSlice';
import { RootState } from '@/store/reducers';
import { getMember } from '@/store/actions/members';
import { onEmployeeTabChanage } from '@/store/reducers/actionsSlice';

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
    name: Yup.string().required('Please enter employee name'),
    email: Yup.string().email('Please provide an valid email address').required('Please enter employee email address'),
    designation: Yup.object().required('Please enter employee role'),
});

const Form = () => {
    const member = useSelector((state: RootState) => getMember(state, state.actions.editMemberId));
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
    const [action, setAction] = useState(member ? 'Update' : 'Add');
    const [values, setValues] = useState<InitialValues>(formatedMember() ?? initialValues);
    const dispatch = useDispatch();

    const handleSubmit = (values: InitialValues) => {
        if (member) {
            dispatch(updateMember(values));
        } else {
            dispatch(addMember(values));
        }

        dispatch(onEmployeeTabChanage('employees'));
    }

    const formatedDesignations: Option[] = designations.map((designation) => ({
        id: designation,
        label: designation,
        value: designation,
    }));

    return (
        <div className="tab-pane fade active show" id="v-pills-settings" role="tabpanel"
            aria-labelledby="v-pills-settings-tab">
            <div className="padding-box pdlb">
                <div className="row">
                    <div className="card col-lg-6">
                        <div className="login-title-box">
                            <h1>Add Employees</h1>
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
