// packages
import { useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
// types
import { Project, Task } from '@/types';
// form
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
// images
import IMAGES from '@/assets/images';
// store
import { RootState } from '@/store/rootReducer';
import { getProjectById } from '@/store/selectors/projects';
import { getTaskById } from '@/store/selectors/tasks';
import { getEditProjectId, getEditTaskId, getIsSidePanelOpen } from '@/store/selectors/actions';


// types
type FormProps = {
    onSubmit: (values: Project | Task, isEditMode?: boolean) => void,
    initialValues?: Project,
    formTitle?: string,
};

const initialProjectValues: Project = {
    id: '',
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
    formTitle,
}: FormProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const editProjectId = useSelector(getEditProjectId);
    const editTaskId = useSelector(getEditTaskId);
    const isSidePanelOpen = useSelector(getIsSidePanelOpen);
    const project = useSelector((state: RootState) => getProjectById(state, editProjectId));
    const task = useSelector((state: RootState) => getTaskById(state, editTaskId));
    const [data, setData] = useState(project ? project : task ? task : initialProjectValues);
    const action = editProjectId ? 'Update' : editTaskId ? 'Update' : 'Create';
    const title = formTitle ?? 'Project';
    const { ChevronRightIcon } = IMAGES;


    const onNext = (data: Project | Task, isLastStep: boolean = false) => {
        setData(prev => ({ ...prev, ...data }));

        if (isLastStep) {
            const isEditMode = editProjectId ? Boolean(editProjectId) : Boolean(editTaskId);
            onSubmit(data, isEditMode);
            return;
        }

        setCurrentStep(prev => prev + 1);
    };

    const onPrev = (data: Project | Task) => {
        setData(prev => ({ ...prev, ...data }));
        setCurrentStep(prev => prev - 1);
    };

    const steps = [
        <Step1 onNext={onNext} data={data} title={title} />,
        <Step2 onNext={onNext} onPrev={onPrev} data={data} />,
        <Step3 onNext={onNext} onPrev={onPrev} data={data} isEditMode={editProjectId ? Boolean(editProjectId) : Boolean(editTaskId)} />,
    ];

    return (
        <div className={`padding-box ${isSidePanelOpen ? 'pdlb' : ''}`}>
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