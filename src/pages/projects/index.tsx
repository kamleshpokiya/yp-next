import { ActionPanel, Projects as AllProjects } from '@/sections/projects';
import Head from 'next/head';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/reducers';
import Drawer from '@/sections/common/Drawer';
import Form from '@/sections/common/form';
import { Project } from '@/types';
import { addProject, updateProject } from '@/store/reducers/projectsSlice';
import { onProjectTabChange } from '@/store/reducers/actionsSlice';

const Projects = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state: RootState) => state.projects);
    const currentTab = useSelector((state: RootState) => state.actions.currentProjectTab);

    const onSubmit = (values: Project, isEditMode = false) => {
        const serializedValues = {
            ...values,
            dueDate: new Date(values.dueDate).toISOString(),
        };

        if (isEditMode) {
            console.log('project updated');
            dispatch(updateProject(serializedValues));
        } else {
            console.log('project created');
            dispatch(addProject(serializedValues));
        }

        dispatch(onProjectTabChange(values.status === 'Pending Allocation' ? 'newProjects' : 'inProgressProjects'));
    }

    useEffect(() => {
        console.log('projects: ', projects);
    }, [projects]);

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
                            {currentTab === 'addProject' &&
                                <Form
                                    onSubmit={onSubmit}
                                />
                            }
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
