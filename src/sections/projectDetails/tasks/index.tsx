// packages
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ChangeEvent, useState } from 'react';
// components
import SearchField from '@/components/SearchField';
// sections
import TaskCard from '@/sections/projectDetails/TaskCard';
import ProjectCard from '@/sections/projects/ProjectCard';
// store
import { RootState } from '@/store/rootReducer';
import { updateTask } from '@/store/slices/tasks';
import { getProjectById } from '@/store/selectors/projects';
import { handleTaskDetailsId } from '@/store/slices/actions';
import { getTasksByProjectId } from '@/store/selectors/tasks';
import { getViewProjectId, getIsSidePanelOpen, getTaskDetailsId } from '@/store/selectors/actions';


// types
type TasksProps = {
    projectId: string | string[] | undefined,
};

const allStatus = ['Todo', 'In Progress', 'Completed'];

export const getTaskNextStage = (status: string): string => {
    switch (status) {
        case 'Todo':
            return 'In Progress'
        case 'In Progress':
            return 'Completed';
        case 'Completed':
            return 'Archived';
        case 'Archived':
            return 'Deleted';
        default:
            return 'Deleted';
    }
}

const Tasks = ({ projectId }: TasksProps) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const activeTasks = useSelector((state: RootState) => getTasksByProjectId(state, projectId));
    const isSidePanelOpen = useSelector(getIsSidePanelOpen);
    const taskDetailsId = useSelector(getTaskDetailsId);
    const viewProjectId = useSelector(getViewProjectId);
    const project = useSelector((state: RootState) => getProjectById(state, viewProjectId));
    const isTaskDetailsDrawerOpen = Boolean(taskDetailsId);
    const dispatch = useDispatch();
    const isSearchQuery = searchQuery.trim() !== '';

    const getTasksBySearchedQuery = () => {
        return activeTasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    const filteredTasks = isSearchQuery ? getTasksBySearchedQuery() : activeTasks;

    const onUpdateTask = (id: string, status: string) => {
        dispatch(updateTask({ id, status }));
        dispatch(handleTaskDetailsId(null));
    }

    return (
        <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
            <div className={`padding-box ${isSidePanelOpen ? 'pdlb' : ''} ${isTaskDetailsDrawerOpen ? 'pdrb' : ''}`}>
                {/* View Project Card */}
                {viewProjectId && project ? (
                    <div className="row" style={{ padding: '0 15px' }}>
                        <div className='col-md-12 listing-box list-show'>
                            <ProjectCard project={project} />
                        </div>
                    </div>
                ) : null}
                {/* View Project Card */}

                <div className="horizonta-scroll-bar-wrap custom-padding-searchbox">
                    <SearchField
                        value={searchQuery}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    />

                    <div style={{ margin: '20px 20px 0 0' }}>
                        <div className="task-main-box shadow-scroll-x">
                            {allStatus.map((status, key) => (
                                <div className="task-box" key={key}>
                                    <div className="tasks-title">
                                        <h3>{status}</h3>
                                    </div>
                                    <div className="tasks scroll-bar-wrap">
                                        <div className="scroll-box">
                                            {filteredTasks.map((task, key) => {
                                                if (task.status !== status || task.status === 'Archived') return null;
                                                const moveButton = {
                                                    title: `Move To ${getTaskNextStage(status)}`,
                                                    onClick: () => onUpdateTask(task.id, getTaskNextStage(status)),
                                                };

                                                return (
                                                    <TaskCard key={key} {...task} moveButton={moveButton} />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="horizontal-cover-bar" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks;