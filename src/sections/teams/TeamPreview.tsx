// packages
import { useSelector } from 'react-redux';
// components
import Assigners from '@/components/Assigners';
// store
import { getAllTeams } from '@/store/selectors/teams';


// types
type TeamPreviewProps = {
    onItemClick: (id: string) => void,
};

const TeamPreview = ({ onItemClick }: TeamPreviewProps) => {
    const teams = useSelector(getAllTeams);

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
                <h3>Your Teams</h3>
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
