import { Project } from '@/types';
import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import IMAGES from '@/assets/img';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { getProjectById } from '@/store/actions/projects';

type Action = 'Create' | 'Update';
type Title = 'Project' | 'Task';

type FormProps = {
    onSubmit: (values: Project, isEditMode?: boolean) => void,
    initialValues?: Project,
};

const initialProjectValues: Project = {
    title: '',
    description: '',
    dueDate: new Date(),
    categories: [],
    status: 'Pending Allocation',
    deadline: 'Deadline',
    memberIds: [],
    teamIds: [],
};

const Form = ({
    onSubmit,
}: FormProps) => {
    const editProjectId = useSelector((state: RootState) => state.actions.editProjectId);
    const project = useSelector((state: RootState) => getProjectById(state, editProjectId));

    const [action, setAction] = useState(editProjectId ? 'Update' : 'Create');
    const [title, setTitle] = useState('Project');
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState(project ?? initialProjectValues);
    const { ChevronRightIcon } = IMAGES;


    const onNext = (data: Project, isLastStep: boolean = false) => {
        setData(prev => ({ ...prev, ...data }));

        if (isLastStep) {
            const isEditMode = Boolean(editProjectId) ?? false;
            onSubmit(data, isEditMode);
            return;
        }

        setCurrentStep(prev => prev + 1);
    };

    const onPrev = (data: Project) => {
        setData(prev => ({ ...prev, ...data }));
        setCurrentStep(prev => prev - 1);
    };

    const steps = [
        <Step1 onNext={onNext} data={data} />,
        <Step2 onNext={onNext} onPrev={onPrev} data={data} />,
        <Step3 onNext={onNext} onPrev={onPrev} data={data} isEditMode={Boolean(editProjectId)} />,
    ];

    return (
        <div>
            <div className="row">
                <div className="card col-lg-6">
                    <div className="login-title-box">
                        <h1>{action} {title}</h1>
                    </div>
                    <div className="form survey-form">
                        <div className="left-side">
                            <ul className="progress-bar">
                                <li className="active" />
                                <span>
                                    <Image src={ChevronRightIcon.src} alt={ChevronRightIcon.alt} />
                                </span>
                                <li className={currentStep > 0 ? 'active' : ''} />
                                <span>
                                    <Image src={ChevronRightIcon.src} alt={ChevronRightIcon.alt} />
                                </span>
                                <li className={currentStep > 1 ? 'active' : ''} />
                            </ul>
                        </div>
                        <div className="left-side">
                            {steps[currentStep]}
                        </div>
                    </div>
                </div>

                <div className="col-lg-6" />
            </div>
        </div>
    );
};

export default Form;