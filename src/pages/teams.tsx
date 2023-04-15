import { Fragment, useState } from 'react';
import Head from 'next/head';
import AddTeam from '@/sections/teams/AddTeam';
import TeamPreview from '@/sections/teams/TeamPreview';
import TeamAvatar from '@/sections/teams/TeamAvatar';
import TeamDrawer from '@/sections/teams/TeamDrawer';

const Teams = () => {
    const [showTeam, setShowTeam] = useState<string | null>(null);

    const onShowTeam = (id: string) => {
        setShowTeam(id);
    }

    const onHideTeam = () => {
        setShowTeam(null);
    }

    return (
        <Fragment>
            <Head>
                <title>Teams</title>
            </Head>

            <div className="row" id="teamsPage">
                <div className="col-md-4 first-team-form-box">
                    <div className="new-teams-main-box">
                        <div className="login-title-box">
                            <h3>New team</h3>
                            <div className="res-x-btn">
                                <button>X</button>
                            </div>
                        </div>
                        <div className="row">
                            <TeamAvatar />
                            <AddTeam />
                        </div>
                    </div>
                </div>

                <div className="col-md-3 secend-your-teams-box">
                    <TeamPreview onItemClick={onShowTeam} />
                </div>

                {showTeam && (
                    <TeamDrawer id={showTeam} onClose={onHideTeam} />
                )}
            </div>

        </Fragment>
    );
};

export default Teams;
