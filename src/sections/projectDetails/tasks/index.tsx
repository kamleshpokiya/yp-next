import SearchBox from '@/components/SearchBox';
import { Task } from '@/types';
import TaskCard from '../TaskCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { getTasksByProjectId } from '@/store/actions/tasks';

type TasksProps = {
    projectId: string | string[] | undefined,
};

const allStatus = ['Todo', 'In Progress', 'Completed'];

const Tasks = ({ projectId }: TasksProps) => {
    const activeTasks = useSelector((state: RootState) => getTasksByProjectId(state, projectId));

    return (
        <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
            <div className="padding-box pdlb">
                <div className="horizonta-scroll-bar-wrap">
                    <SearchBox
                        options={activeTasks}
                        getOptionLabel={(option: Task) => option.title}
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
                                            {activeTasks.map((task, key) => {
                                                if (task.status !== status) return null;

                                                return (
                                                    <TaskCard key={key} {...task} />
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