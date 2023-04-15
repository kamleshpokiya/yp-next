import ActionPanel from '@/sections/projectDetails/ActionPanel';
import { RootState } from '@/store/reducers';
import { Project } from '@/types';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Tasks from '@/sections/projectDetails/tasks';
import Archived from '@/sections/projectDetails/archived';

const ProjectDetails = () => {
    const router = useRouter();
    const { projectId } = router.query;
    const currentTaskTab = useSelector((state: RootState) => state.actions.currentTaskTab);

    const onSubmit = (values: Project) => {
        console.log('values: ', values);
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
                            <div>Add Task Form</div>
                        ) : null}

                        {currentTaskTab === 'tasks' ? (
                            <Tasks projectId={projectId} />
                        ) : null}

                        {currentTaskTab === 'archived' ? (
                            <Archived />
                        ) : null}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProjectDetails
