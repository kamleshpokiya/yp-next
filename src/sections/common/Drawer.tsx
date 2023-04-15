import useToggle from '@/hooks/useToggle';
import { RootState } from '@/store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import IMAGES from '@/assets/img';
import Image from 'next/image';
import { removeProjectDetailsId } from '@/store/reducers/actionsSlice';
import { formatDate } from '@/utils/formatDate';
import Assigners from '@/components/Assigners';
import { getMembers } from '@/store/actions/members';
import { getTeams } from '@/store/actions/teams';


const MAX_CONTENT = 100;

const Drawer = () => {
    const { isOpen: isShowMore, onToggle: onShowMore } = useToggle();
    const { leftArrowIcon } = IMAGES;
    const dispatch = useDispatch();
    const projectDetailsId = useSelector((state: RootState) => state.actions.projectDetailsId);
    const projectDetails = useSelector((state: RootState) => state.projects.find(project => project.id === projectDetailsId));
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

    if (!projectDetails) return null;

    return (
        <div className="col-lg-3 toggle-right project-desc-wrap" id="first">
            <div className="project-des-main-box">
                <div className="project-des-box">
                    <div className="title-boxs">
                        <h3>Project Description</h3>
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
                            <p>pdf-file</p>
                        </a>
                        <a className="pdf">
                            <i className="fa-solid fa-file-image" />
                            <p>pdf-file</p>
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
