// packages
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// images
import IMAGES from '@/assets/img';
// components
import Assigners from '@/components/Assigners';
// hooks
import useToggle from '@/hooks/useToggle';
// store
import { getMembers } from '@/store/selectors/members';
import { getTeams } from '@/store/selectors/teams';
import { RootState } from '@/store/rootReducer';
import { handleEditTaskId, handleTaskDetailsId, onTaskTabChange } from '@/store/slices/actions';
// utils
import { formatDate } from '@/utils/formatDate';
// sections
import Activity from './Activity';


// types
type DrawerProps = {
    taskId: null | string,
};

const MAX_CONTENT = 100;

const Drawer = ({ taskId }: DrawerProps) => {
    const task = useSelector((state: RootState) => state.tasks.find(task => task.id === taskId));
    const { isOpen: isShowMore, onToggle: onShowMore } = useToggle();
    const members = useSelector((state: RootState) => getMembers(state, task?.memberIds));
    const teams = useSelector((state: RootState) => getTeams(state, task?.teamIds));
    const { leftArrowIcon, attachment } = IMAGES;
    const dispatch = useDispatch();

    const assignedMembers = members.map((member) => ({
        id: member?.id,
        name: member?.name,
        avatar: member?.avatar,
        description: member?.designation,
    }));

    const assignedTeams = teams.map((team) => ({
        id: team?.id,
        name: team?.name,
        avatar: team?.avatar,
        description: `${team?.memberIds.length} members`,
    }));

    const assigners = assignedMembers.concat(assignedTeams);

    const handleEditTask = () => {
        dispatch(onTaskTabChange('addTask'));
        dispatch(handleEditTaskId(taskId));
    };


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
                                    <h4>
                                        Attachments:
                                    </h4>
                                    <div className="pdf-main-bpx">
                                        <a className="pdf">
                                            <i className="fa-solid fa-file-pdf" />
                                            <p>
                                                pdf-file
                                            </p>
                                        </a>
                                        <a className="pdf">
                                            <i className="fa-solid fa-file-image" />
                                            <p>
                                                pdf-file
                                            </p>
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
                                    <button>Move..</button>
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