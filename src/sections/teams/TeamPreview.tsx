import Assigners from "@/components/Assigners";
import { RootState } from "@/store/reducers";
import { useSelector } from "react-redux";

type TeamPreviewProps = {
    onItemClick: (id: string) => void,
};

const TeamPreview = ({ onItemClick }: TeamPreviewProps) => {
    const teams = useSelector((state: RootState) => state.teams);

    const formateTeam = (team: any) => ({
        id: team?.id,
        name: team?.name,
        avatar: team?.avatar,
        description: team?.memberIds.length ? `${team?.memberIds.length} members` : 'No members',
    });

    const formatedTeams = teams.map(formateTeam);

    return (
        <div className="your-teams">
            <div className="login-title-box">
                <h3>Your teams</h3>
            </div>
            {formatedTeams.length ? (
                <Assigners
                    assigners={formatedTeams}
                    onItemClick={onItemClick}
                />
            ) : null}
        </div>
    );
};

export default TeamPreview;
