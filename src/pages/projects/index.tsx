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


// projects page component
const Projects = () => {
    const dispatch = useDispatch();
    const currentTab = useSelector(getCurrentProjectTab);

    /**
     * 1. Adds or updates a project using static data.
     * 2. Backend functionality is not implemented, so the data will not persist in real time.
     * 3. If desired, backend functionality can be added to enable real-time data updates.
     */
    // handle add/update project
    const onSubmit = ({ dueDate, status, ...rest }: Project | Task, isEditMode = false) => {
        const serializedValues = {
            ...rest,
            status,
            dueDate: new Date(dueDate).toISOString(),
        };

        dispatch(isEditMode ? updateProject(serializedValues) : addProject(serializedValues));
        // redirect to projects tab via status
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
