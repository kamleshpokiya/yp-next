// packages
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// components
import InputField from '@/components/InputField';
import TextArea from '@/components/TextArea';
import DatePicker from '@/components/DatePicker';
// types
import { Project, Task } from '@/types';


// types
type Step1Props = {
    onNext: (values: Project | Task, isLastStep?: boolean) => void,
    data: Project | Task,
    title: string,
};


const Step1 = ({ onNext, data, title }: Step1Props) => {
    const validationSchema = Yup.object({
        title: Yup.string().required(`Please enter your ${title.toLowerCase()} name`),
        description: Yup.string().required(`Please enter your ${title.toLowerCase()} description`),
        dueDate: Yup.date()
            .min(new Date(), `${title} due date must be a future date`)
            .required(`Please provide due date for your ${title.toLowerCase()}`)
            .typeError(`${title} due date must be an valid date`),
    });

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
                                            label={`${title} Title:`}
                                            name="title"
                                            id="title"
                                            type="text"
                                            value={values.title}
                                            placeholder="Enter your Project title her..."
                                        />
                                        <TextArea
                                            label={`${title} Description:`}
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
