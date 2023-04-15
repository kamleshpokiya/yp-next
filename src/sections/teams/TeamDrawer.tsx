import IMAGES from "@/assets/img";
import Assigners from "@/components/Assigners";
import Iconify from "@/components/Iconify";
import { getMembers } from "@/store/actions/members";
import { getTeam } from "@/store/actions/teams";
import { RootState } from "@/store/reducers";
import Image from "next/image";
import { useSelector } from "react-redux";
import { onRemoveMemberFromTeam, onRemoveTeam } from "@/store/reducers/teamsSlice";
import { useDispatch } from "react-redux";
import { faker } from "@faker-js/faker";

type TeamDrawerProps = {
    id: string,
    onClose: () => void,
};

const TeamDrawer = ({ id, onClose }: TeamDrawerProps) => {
    const team = useSelector((state: RootState) => getTeam(state, id));
    const members = useSelector((state: RootState) => getMembers(state, team?.memberIds));
    const { leftArrowIcon } = IMAGES;
    const dispatch = useDispatch();

    const formateMember = (member: any) => ({
        id: member?.id,
        name: member?.name,
        avatar: member?.avatar,
        description: member?.designation,
    });

    const formatedMembers = members.map(formateMember);

    const handleRemoveMember = (id: string) => {
        dispatch(onRemoveMemberFromTeam({
            teamId: team?.id,
            memberId: id,
        }));
    }

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
