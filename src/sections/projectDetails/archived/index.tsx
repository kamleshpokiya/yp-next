// packages
import { useSelector, useDispatch } from 'react-redux';
import { ChangeEvent, useState } from 'react';
// components
import SearchField from '@/components/SearchField';
// store
import { updateTask } from '@/store/slices/tasks';
import { RootState } from '@/store/rootReducer';
import { handleTaskDetailsId } from '@/store/slices/actions';
import { getArchivedTasksByProjectId } from '@/store/selectors/tasks';
import { getIsSidePanelOpen, getTaskDetailsId } from '@/store/selectors/actions';
// sections
import TaskCard from '@/sections/projectDetails/TaskCard';


// types
type ArchivedProps = {
    projectId: string | string[],
};

// archived tasks component
const Archived = ({ projectId }: ArchivedProps) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const dispatch = useDispatch();
    const isSidePanelOpen = useSelector(getIsSidePanelOpen);
    const taskDetailsId = useSelector(getTaskDetailsId);
    const isTaskDetailsDrawerOpen = Boolean(taskDetailsId);
    const archivedTasks = useSelector((state: RootState) => getArchivedTasksByProjectId(state, projectId));
    const isSearchQuery = searchQuery.trim() !== '';

    // filter tasks by search
    const getTasksBySearchedQuery = () => {
        return archivedTasks?.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // all filtered tasks
    const filteredTasks = isSearchQuery ? getTasksBySearchedQuery() : archivedTasks;

    return (
        <div className="tab-pane fade show active" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
            <div className={`padding-box ${isSidePanelOpen ? 'pdlb' : ''} ${isTaskDetailsDrawerOpen ? 'pdrb' : ''}`}>
                <div className="archived-list-main-box custom-padding-searchbox">
                    <SearchField
                        value={searchQuery}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    />

                    <div className="archived-list">
                        {filteredTasks ? filteredTasks.map((task, key) => {
                            const moveButton = {
                                title: 'Delete Task',
                                onClick: () => {
                                    dispatch(updateTask({ id: task.id, status: 'Deleted' }));
                                    dispatch(handleTaskDetailsId(null));
                                },
                            };

                            return (
                                <TaskCard key={key} {...task} moveButton={moveButton} />
                            );
                        }) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Archived;
