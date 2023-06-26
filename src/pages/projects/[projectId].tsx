// packages
import Head from 'next/head';
import { useRouter } from 'next/router'
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// sections
import ActionPanel from '@/sections/projectDetails/ActionPanel';
import Tasks from '@/sections/projectDetails/tasks';
import Archived from '@/sections/projectDetails/archived';
import Form from '@/sections/common/form';
import Drawer from '@/sections/projectDetails/Drawer';
// store
import { addTask, updateTask } from '@/store/slices/tasks';
import { onTaskTabChange } from '@/store/slices/actions';
import { getCurrentTaskTab, getTaskDetailsId } from '@/store/selectors/actions';
// types
import { Project, Task } from '@/types';


// project details page component
const ProjectDetails = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { projectId } = router.query;
    const currentTaskTab = useSelector(getCurrentTaskTab);
    const taskDetailsId = useSelector(getTaskDetailsId);

    /**
     * 1. Adds or updates a task in project using static data.
     * 2. Backend functionality is not implemented, so the data will not persist in real time.
     * 3. If desired, backend functionality can be added to enable real-time data updates.
     */
    // handle add/update task
    const onSubmit = (values: Project | Task, isEditMode = false) => {
        const action = isEditMode ? updateTask : addTask;
        const updatedValues = {
            ...values,
            projectId,
            archived: false,
            status: 'Todo', // detault task status
            dueDate: new Date(values.dueDate).toISOString(),
        };
        dispatch(action(updatedValues));
        dispatch(onTaskTabChange('tasks'));
    }

    if (!projectId) return null;

    return (
        <Fragment>
            <Head>
                <title>Project Details</title>
            </Head>

            <div className="row" id='projectDetailsPage'>
                <ActionPanel />

                <div style={{ flexGrow: 1, width: 'min-content' }}>
                    <div className="tab-content" id="v-pills-tabContent">
                        {currentTaskTab === 'addTask' ? (
                            <Form onSubmit={onSubmit} formTitle='Task' />
                        ) : null}

                        {currentTaskTab === 'tasks' ? (
                            <Tasks projectId={projectId} />
                        ) : null}

                        {currentTaskTab === 'archived' ? (
                            <Archived projectId={projectId} />
                        ) : null}
                    </div>
                </div>
                {Boolean(taskDetailsId) && (
                    <Drawer taskId={taskDetailsId} />
                )}
            </div>
        </Fragment>
    )
}

export default ProjectDetails
