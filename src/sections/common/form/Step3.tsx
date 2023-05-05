// packages
import { Formik, Form } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
// components
import SelectField from '@/components/SelectField';
// types
import { Project, Task } from '@/types';
// _mock
import categories from '@/_mock/categories';
// form
import AddCategory from './AddCategory';
import FileUpload from './FileUpload';


// types
type FormatedCategory = {
    id: string,
    label: string,
    value: string,
};

type Step3Props = {
    onNext: (values: Project | Task, isLastStep?: boolean) => void,
    onPrev: (values: Project | Task) => void,
    data: Project | Task,
    isEditMode?: boolean,
};

const validationSchema = Yup.object({
    assignedMembersIds: Yup.array().of(Yup.string()),
});

const Step3 = ({ data, onNext, onPrev, isEditMode }: Step3Props) => {
    const initialCategories = data.categories.map((category) => ({
        id: category,
        label: category,
        value: category,
    }))
    const [selectedCategories, setSelectedCategories] = useState<FormatedCategory[]>(initialCategories ?? []);

    const formatedCategories = categories.map((category) => ({
        id: category,
        label: category,
        value: category,
    }));

    const mergeAll = (values: Project | Task) => {
        const categories: string[] = selectedCategories.map((category) => category.value);

        return {
            ...values,
            categories,
        }
    };

    const handleNext = (values: Project | Task) => {
        const newValues = mergeAll(values);
        onNext(newValues, true);
    }

    const handlePrev = (values: Project | Task) => {
        const newValues = mergeAll(values);
        onPrev(newValues);
    }

    return (
        <div className="main active">
            <div className="sign-up-wrapper login-account">
                <Formik
                    initialValues={data}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleNext(values)}
                >
                    {({ values }) => (
                        <Form>
                            <div className="login-form technology-box">
                                <div className="catagory-main-box">
                                    <label htmlFor="inputDate">Choose Category</label>
                                    <SelectField
                                        options={formatedCategories}
                                        value={selectedCategories}
                                        onChange={(selected: any) => setSelectedCategories(selected)}
                                        getOptionLabel={(option: any) => option.label}
                                        placeholder='Search Categories...'
                                        maxWidth='100%'
                                        isMulti
                                    />
                                    <AddCategory
                                        selectedCategories={selectedCategories}
                                        setSelectedCategories={setSelectedCategories}
                                    />
                                </div>
                                <FileUpload />
                            </div>

                            <div className="buttons button_space">
                                <button className="star-btn pre_button" onClick={() => handlePrev(values)}>Previous</button>
                                <button className=" submit_button star-btn" type='submit'>
                                    {isEditMode ? 'Update' : 'Upload'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Step3;
