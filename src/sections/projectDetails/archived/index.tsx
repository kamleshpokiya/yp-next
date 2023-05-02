// packages
import { useSelector } from 'react-redux';
// components
import SearchBox from '@/components/SearchBox';
// store
import { getArchivedTasksByProjectId } from '@/store/selectors/tasks';
import { RootState } from '@/store/rootReducer';
// types
import { Task } from '@/types';
// sections
import TaskCard from '@/sections/projectDetails/TaskCard';


// types
type ArchivedProps = {
    projectId: string | string[],
};

const Archived = ({ projectId }: ArchivedProps) => {
    const archivedTasks = useSelector((state: RootState) => getArchivedTasksByProjectId(state, projectId));
    const isSidePanelOpen = useSelector((state: RootState) => state.actions.isSidePanelOpen);
    const taskDetailsId = useSelector((state: RootState) => state.actions.taskDetailsId);
    const isTaskDetailsDrawerOpen = Boolean(taskDetailsId);

    return (
        <div className="tab-pane fade show active" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
            <div className={`padding-box ${isSidePanelOpen ? 'pdlb' : ''} ${isTaskDetailsDrawerOpen ? 'pdrb' : ''}`}>
                <div className="archived-list-main-box">
                    <SearchBox
                        options={archivedTasks}
                        getOptionLabel={(option: Task) => option.title}
                    />
                    <div className="archived-list">
                        {archivedTasks ? archivedTasks.map((task, key) => (
                            <TaskCard key={key} {...task} />
                        )) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Archived;
