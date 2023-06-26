// packages
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// images
import IMAGES from '@/assets/images';
// components
import Assigners from '@/components/Assigners';
import Iconify from '@/components/Iconify';
// store
import { getMembers } from '@/store/selectors/members';
import { getTeam } from '@/store/selectors/teams';
import { RootState } from '@/store/rootReducer';
import { onRemoveMemberFromTeam, onRemoveTeam } from '@/store/slices/teams';


// types
type TeamDrawerProps = {
    id: string,
    onClose: () => void,
};

// team drawer component
const TeamDrawer = ({ id, onClose }: TeamDrawerProps) => {
    const team = useSelector((state: RootState) => getTeam(state, id));
    const members = useSelector((state: RootState) => getMembers(state, team?.memberIds));
    const { leftArrowIcon } = IMAGES;
    const dispatch = useDispatch();

    // formate member
    const formateMember = (member: any) => ({
        id: member?.id,
        name: member?.name,
        avatar: member?.avatar,
        description: member?.designation,
    });

    // formated members
    const formatedMembers = members.map(formateMember);

    // handle remove member from team
    const handleRemoveMember = (id: string) => {
        dispatch(onRemoveMemberFromTeam({
            teamId: team?.id,
            memberId: id,
        }));
    }

    // handle remove team
    const handleRemoveTeam = () => {
        dispatch(onRemoveTeam(id));
        onClose();
    }

    return (
        <div className="col-lg-4 toggle-right project-desc-wrap" id="first">
            <div className="project-des-main-box">
                <div className="project-des-box">
                    <div className="left">
                        <div className="team-logo">
                            <div className="file-input">
                                <span className="label team-avatar-icon-wrapper">
                                    {team?.avatar ? (
                                        <Image
                                            src={team.avatar} alt={team.name}
                                            className="form__image"
                                            width={110}
                                            height={110}
                                        />
                                    ) : (
                                        <Iconify
                                            icon="fa-solid:users"
                                            width={110}
                                            sx={{ color: '#BABABC', margin: '25px' }}
                                        />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="team-member-ditails">
                            <div className="des-boxs" id="Title">
                                <h4>Name of team:</h4>
                                <p>{team?.name}</p>
                            </div>
                            <div className="des-boxs" id="Title">
                                <h4>Team members:</h4>
                                <p>{team?.memberIds.length ? team?.memberIds.length : 'No'} Members</p>
                            </div>
                        </div>
                    </div>
                </div>

                {formatedMembers.length ? (
                    <Assigners
                        assigners={formatedMembers}
                        isRemovable
                        onRemove={handleRemoveMember}
                    />
                ) : null}
                <div className="buttons" onClick={handleRemoveTeam}>
                    <button className="star-btn next_button">Delete Team</button>
                </div>

                <div className="close-project-desc-main-box" onClick={onClose}>
                    <a href="javascript:void(0);" className="close-project-desc">
                        <Image src={leftArrowIcon.src} alt={leftArrowIcon.alt} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default TeamDrawer
