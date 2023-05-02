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
import { RootState } from '@/store/rootReducer';
import { addTask, updateTask } from '@/store/slices/tasks';
import { onTaskTabChange } from '@/store/slices/actions';
// types
import { Project, Task } from '@/types';


const ProjectDetails = () => {
    const router = useRouter();
    const { projectId } = router.query;
    const dispatch = useDispatch();
    const currentTaskTab = useSelector((state: RootState) => state.actions.currentTaskTab);
    const taskDetailsId = useSelector((state: RootState) => state.actions.taskDetailsId);

    const onSubmit = (values: Project | Task, isEditMode: boolean = false) => {
        console.log('values: ', values);
        const newTask = {
            ...values,
            projectId,
            archived: false,
            status: 'Todo',
            dueDate: new Date(values.dueDate).toISOString(),
        };

        if (isEditMode) {
            dispatch(updateTask(newTask));
        } else {
            dispatch(addTask(newTask));
        }

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
