import InputField from '@/components/InputField';
import TextArea from '@/components/TextArea';
import DatePicker from '@/components/DatePicker';
import { Formik, Form, Field } from 'formik';
import { Project } from '@/types';
import * as Yup from 'yup';

type Step1Props = {
    onNext: (values: Project, isLastStep?: boolean) => void,
    data: Project,
};

const validationSchema = Yup.object({
    title: Yup.string().required('Please enter your project name'),
    description: Yup.string().required('Please enter your project description'),
    dueDate: Yup.date().min(new Date(), 'Project due date must be a future date').required('Please provide due date for your project').typeError('Project due date must be an valid date'),
});

const Step1 = ({ onNext, data }: Step1Props) => {
    return (
        <div className="main active">
            <div className=" login-account">
                <div className="login-form">
                    <div className="account-box">
                        <div className="input-main-box">
                            <Formik
                                initialValues={data}
                                validationSchema={validationSchema}
                                onSubmit={(values) => onNext(values)}
                            >
                                {({
                                    values,
                                }) => (
                                    <Form>
                                        <InputField
                                            label="Project Title:"
                                            name="title"
                                            id="title"
                                            type="text"
                                            value={values.title}
                                            placeholder="Enter your Project title her..."
                                        />
                                        <TextArea
                                            label="Project Description:"
                                            name="description"
                                            id="comment"
                                            value={values.description}
                                            cols={30}
                                            rows={10}
                                            placeholder="Enter your project Description here..."
                                        />
                                        <Field
                                            label='Due Date'
                                            name="dueDate"
                                            className="form-control"
                                            id="dueDate"
                                            value={new Date(values.dueDate)}
                                            as={DatePicker}
                                        />

                                        <div className="buttons">
                                            <button className="star-btn next_button" type='submit'>Next</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step1;
