// packages
import Head from 'next/head';
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react';
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
import { RootState } from '@/store/rootReducer';


const ProjectDetails = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { projectId } = router.query;
    const currentTaskTab = useSelector(getCurrentTaskTab);
    const taskDetailsId = useSelector(getTaskDetailsId);
    const allArchivedTasks = useSelector((state: RootState) => state.tasks.filter(task => task.status === 'Archived'));

    useEffect(() => {
        console.log('all archived tasks: ', allArchivedTasks);
    })

    const onSubmit = (values: Project | Task, isEditMode = false) => {
        const action = isEditMode ? updateTask : addTask;
        const updatedValues = {
            ...values,
            projectId,
            archived: false,
            status: 'Todo',
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
