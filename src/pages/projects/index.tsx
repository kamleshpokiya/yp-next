// packages
import Head from 'next/head';
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// sections
import { ActionPanel, Projects as AllProjects } from '@/sections/projects';
import Drawer from '@/sections/common/Drawer';
import Form from '@/sections/common/form';
// store
import { RootState } from '@/store/rootReducer';
import { addProject, updateProject } from '@/store/slices/projects';
import { onProjectTabChange } from '@/store/slices/actions';
// types
import { Project, Task } from '@/types';


const Projects = () => {
    const dispatch = useDispatch();
    const currentTab = useSelector((state: RootState) => state.actions.currentProjectTab);

    const onSubmit = (values: Project | Task, isEditMode = false) => {
        const serializedValues = {
            ...values,
            dueDate: new Date(values.dueDate).toISOString(),
        };

        if (isEditMode) {
            dispatch(updateProject(serializedValues));
        } else {
            dispatch(addProject(serializedValues));
        }

        dispatch(onProjectTabChange(values.status === 'Pending Allocation' ? 'newProjects' : 'inProgressProjects'));
    }

    return (
        <Fragment>
            <Head>
                <title>Projects</title>
            </Head>

            <div className="row" id='projectsPage'>
                <ActionPanel />

                <div className="col-lg-7 rightSide">
                    <div className="col-lg-7 rightSide">
                        <div className="tab-content" id="v-pills-tabContent">
                            {currentTab === 'addProject' && <Form onSubmit={onSubmit} />}
                            {currentTab !== 'addProject' && <AllProjects status={currentTab} />}
                        </div>
                    </div>
                </div>

                <Drawer />
            </div>
        </Fragment>
    )
}

export default Projects;
