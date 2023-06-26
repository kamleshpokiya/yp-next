// packages
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// images
import IMAGES from '@/assets/images';
// components
import Assigners from '@/components/Assigners';
// hooks
import useToggle from '@/hooks/useToggle';
// store
import { getMembers } from '@/store/selectors/members';
import { getTeams } from '@/store/selectors/teams';
import { RootState } from '@/store/rootReducer';
import { getTaskById } from '@/store/selectors/tasks';
import { handleEditTaskId, handleTaskDetailsId, onTaskTabChange } from '@/store/slices/actions';
// utils
import { formatDate } from '@/utils/formatDate';
// sections
import Activity from './Activity';
import { getTaskNextStage } from './tasks';
import { updateTask } from '@/store/slices/tasks';


// types
type DrawerProps = {
    taskId: null | string,
};

const MAX_CONTENT = 100;

// drawer component
const Drawer = ({ taskId }: DrawerProps) => {
    const task = useSelector((state: RootState) => getTaskById(state, taskId));
    const { isOpen: isShowMore, onToggle: onShowMore } = useToggle();
    const members = useSelector((state: RootState) => getMembers(state, task?.memberIds));
    const teams = useSelector((state: RootState) => getTeams(state, task?.teamIds));
    const { leftArrowIcon } = IMAGES;
    const dispatch = useDispatch();

    // formate assigned members
    const assignedMembers = members.map((member) => ({
        id: member?.id,
        name: member?.name,
        avatar: member?.avatar,
        description: member?.designation,
    }));

    // formate assigned teams
    const assignedTeams = teams.map((team) => ({
        id: team?.id,
        name: team?.name,
        avatar: team?.avatar,
        description: `${team?.memberIds.length} members`,
    }));

    // assigners: all assigned members and teams
    const assigners = assignedMembers.concat(assignedTeams);

    // add task id and change tab to edit task
    const handleEditTask = () => {
        dispatch(onTaskTabChange('addTask'));
        dispatch(handleEditTaskId(taskId));
    };

    // update task status
    const onUpdateTask = () => {
        if (!task?.status) return;
        dispatch(updateTask({ id: task.id, status: getTaskNextStage(task.status) }));
        dispatch(handleTaskDetailsId(null));
    }


    if (!task) return null;

    return (
        <div className="col-lg-3 toggle-right project-desc-wrap" id="first">
            <div className="scroll-bar-wrap">
                <div className="project-des-main-box scroll-box">
                    <div className="project-des-box">
                        <div className="row">
                            <div className="col-lg-8 left">
                                <div className="title-boxs">
                                    <h3>
                                        Task Description
                                    </h3>
                                    <div className="top" onClick={handleEditTask}>
                                        <span>
                                            <i className="fa-solid fa-pen-to-square" /> Edit Task
                                        </span>
                                    </div>
                                </div>
                                <div className="project-des">
                                    <div className="des-boxs" id="Title">
                                        <h4>
                                            Task Title:
                                        </h4>
                                        <p>{task?.title}</p>
                                    </div>
                                    <div className="des-boxs" id="description">
                                        <h4>
                                            Task Description:
                                        </h4>
                                        <div className="view-more">
                                            {!isShowMore ? (`${task?.description.slice(0, MAX_CONTENT)}...`) : (task?.description)}
                                            <div className="btn-container">
                                                <button id="toggle" onClick={() => onShowMore()}>
                                                    {isShowMore ? 'Read Less' : 'Read More'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="des-boxs" id="attachments">
                                    <h4>Attachments:</h4>
                                    <div className="pdf-main-bpx">
                                        <a className="pdf">
                                            <i className="fa-solid fa-file-pdf" />
                                            <p>Guidance.pdf</p>
                                        </a>
                                        <a className="pdf">
                                            <i className="fa-solid fa-file-excel" />
                                            <p>Chartdata.xlsx</p>
                                        </a>
                                        <a className="pdf">
                                            <i className="fa-solid fa-file-image" />
                                            <p>Screenshot-1.png</p>
                                        </a>
                                        <a className="pdf">
                                            <i className="fa-solid fa-file-image" />
                                            <p>Screenshot-2.png</p>
                                        </a>
                                        <a className="pdf">
                                            <i className="fa-solid fa-file-image" />
                                            <p>References.jpg</p>
                                        </a>
                                    </div>
                                </div>
                                <Activity taskId={taskId} />
                            </div>
                            <div className="col-lg-4 right">
                                {assigners.length > 0 ? (
                                    <div className="des-boxs" id="assigned">
                                        <h4>Assigned to:</h4>
                                        <Assigners assigners={assigners} />
                                    </div>
                                ) : null}
                                <div className="des-boxs" id="Deadline">
                                    <div className="deu">
                                        <h4>
                                            Created Date:
                                        </h4>
                                        <p>{formatDate(task?.createdDate)}</p>
                                    </div>
                                    <div className="deu">
                                        <h4>
                                            Due Date:
                                        </h4>
                                        <p>{formatDate(task?.dueDate)}</p>
                                    </div>
                                </div>
                                <div className="move-box">
                                    <button
                                        className='star-btn next_button'
                                        onClick={onUpdateTask}
                                    >{task.status === 'Archived' ? 'Delete Task' : `Move To ${getTaskNextStage(task.status)}`}</button>
                                </div>
                            </div>
                        </div>
                        <div className="close-project-desc-main-box">
                            <a href="javascript:void(0);" className="close-project-desc" onClick={() => dispatch(handleTaskDetailsId(null))}>
                                <Image src={leftArrowIcon.src} alt={leftArrowIcon.alt} style={{ rotate: '180deg' }} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="cover-bar" />
            </div>
        </div>

    );
}

export default Drawer;