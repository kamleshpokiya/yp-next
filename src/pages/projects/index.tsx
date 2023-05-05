// packages
import Head from 'next/head';
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// sections
import { ActionPanel, Projects as AllProjects } from '@/sections/projects';
import Drawer from '@/sections/common/Drawer';
import Form from '@/sections/common/form';
// store
import { addProject, updateProject } from '@/store/slices/projects';
import { onProjectTabChange } from '@/store/slices/actions';
import { getCurrentProjectTab } from '@/store/selectors/actions';
// types
import { Project, Task } from '@/types';


const Projects = () => {
    const dispatch = useDispatch();
    const currentTab = useSelector(getCurrentProjectTab);

    const onSubmit = ({ dueDate, status, ...rest }: Project | Task, isEditMode = false) => {
        const serializedValues = {
            ...rest,
            status,
            dueDate: new Date(dueDate).toISOString(),
        };

        dispatch(isEditMode ? updateProject(serializedValues) : addProject(serializedValues));
        dispatch(onProjectTabChange(status === 'Pending Allocation' ? 'newProjects' : 'inProgressProjects'));
    };

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
