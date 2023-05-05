// packages
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
// hooks
import useToggle from '@/hooks/useToggle';
// store
import { RootState } from '@/store/rootReducer';
import { handleEditProjectId, onProjectTabChange, removeProjectDetailsId } from '@/store/slices/actions';
import { getMembers } from '@/store/selectors/members';
import { getTeams } from '@/store/selectors/teams';
import { getProjectDetailsId } from '@/store/selectors/actions';
import { getProjectById } from '@/store/selectors/projects';
// images
import IMAGES from '@/assets/images';
// utils
import { formatDate } from '@/utils/formatDate';
// components
import Assigners from '@/components/Assigners';


const MAX_CONTENT = 100;

const Drawer = () => {
    const { isOpen: isShowMore, onToggle: onShowMore } = useToggle();
    const { leftArrowIcon } = IMAGES;
    const dispatch = useDispatch();
    const projectDetailsId = useSelector(getProjectDetailsId);
    const projectDetails = useSelector((state: RootState) => getProjectById(state, projectDetailsId));
    const members = useSelector((state: RootState) => getMembers(state, projectDetails?.memberIds));
    const teams = useSelector((state: RootState) => getTeams(state, projectDetails?.teamIds));

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

    const handleEditProject = () => {
        dispatch(onProjectTabChange('addProject'));
        dispatch(handleEditProjectId(projectDetailsId));
    }

    if (!projectDetails) return null;

    return (
        <div className="col-lg-3 toggle-right project-desc-wrap" id="first">
            <div className="project-des-main-box">
                <div className="project-des-box">
                    <div className="title-boxs">
                        <h3>Project Description</h3>
                        <div className="top" onClick={(e) => {
                            e.stopPropagation();
                            handleEditProject();
                        }}>
                            <span>
                                <i className="fa-solid fa-pen-to-square" /> Edit project
                            </span>
                        </div>
                    </div>

                    <div className="project-des">
                        <div className="des-boxs" id="Title">
                            <h4>Project Title:</h4>
                            <p>{projectDetails?.title}</p>
                        </div>
                        <div className="des-boxs" id="description">
                            <h4>Project Description:</h4>
                            <div className="view-more">
                                {!isShowMore ? (`${projectDetails?.description.slice(0, MAX_CONTENT)}...`) : (projectDetails?.description)}
                                <div className="btn-container">
                                    <button id="toggle" onClick={() => onShowMore()}>
                                        {isShowMore ? 'Read Less' : 'Read More'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="des-boxs" id="Deadline">
                        <h4>
                            Due Date:
                        </h4>
                        <p>{formatDate(projectDetails?.dueDate)}</p>
                    </div>

                    {assigners.length > 0 ? (
                        <div className="des-boxs" id="assigned">
                            <h4>Assigned to:</h4>
                            <Assigners assigners={assigners} />
                        </div>
                    ) : null}

                    <div className="des-boxs" id="attachments">
                        <h4>Attachments:</h4>
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

                    <div className="close-project-desc-main-box">
                        <a
                            href="javascript:void(0);"
                            className="close-project-desc"
                            onClick={() => dispatch(removeProjectDetailsId())}
                        >
                            <Image src={leftArrowIcon.src} alt={leftArrowIcon.alt} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
