// packages
import { Fragment, useState } from 'react';
import Head from 'next/head';
// sections
import AddTeam from '@/sections/teams/AddTeam';
import TeamPreview from '@/sections/teams/TeamPreview';
import TeamAvatar from '@/sections/teams/TeamAvatar';
import TeamDrawer from '@/sections/teams/TeamDrawer';
// hooks
import useToggle from '@/hooks/useToggle';


// teams page component
const Teams = () => {
    const [showTeam, setShowTeam] = useState<string | null>(null);
    const { isOpen, onOpen, onClose } = useToggle();

    // show team drawer
    const onShowTeam = (id: string) => {
        setShowTeam(id);
    }

    // hide team drawer
    const onHideTeam = () => {
        setShowTeam(null);
    }

    return (
        <Fragment>
            <Head>
                <title>Teams</title>
            </Head>

            <div className="row" id="teamsPage">
                <div className={`col-md-4 first-team-form-box ${isOpen ? 'yykk' : ''}`}>
                    <div className="new-teams-main-box">
                        <div className="login-title-box">
                            <h3>New Team</h3>
                            <div className="res-x-btn" onClick={onClose}>
                                <button>X</button>
                            </div>
                        </div>
                        <div className="row">
                            <TeamAvatar />
                            <AddTeam onClose={onClose} />
                        </div>
                    </div>
                </div>

                <div className="col-md-3 secend-your-teams-box">
                    <TeamPreview onItemClick={onShowTeam} />
                </div>

                {showTeam && (
                    <TeamDrawer id={showTeam} onClose={onHideTeam} />
                )}

                {/* Add Team Button */}
                <div className="add-btn" onClick={onOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px" height="50px">
                        <g fill="#595bd4" transform="translate(2 2)" className="color200e32 svgShape">
                            <path d="M14.6666667,0 L5.33333333,0 C1.92888889,0 0,1.92888889 0,5.33333333 L0,14.6666667 C0,18.0622222 1.92,20 5.33333333,20 L14.6666667,20 C18.0711111,20 20,18.0622222 20,14.6666667 L20,5.33333333 C20,1.92888889 18.0711111,0 14.6666667,0 Z" opacity=".4" fill="#ddd" className="color000000 svgShape">
                            </path>
                            <path d="M13.3204549,10.7083369 L10.7495202,10.7083369 L10.7495202,13.256979 C10.7495202,13.6673381 10.4139486,14 10,14 C9.58605145,14 9.25047985,13.6673381 9.25047985,13.256979 L9.25047985,10.7083369 L6.67954513,10.7083369 C6.29342268,10.6686984 6,10.3461424 6,9.96132113 C6,9.57649984 6.29342268,9.25394382 6.67954513,9.21430535 L9.24242049,9.21430535 L9.24242049,6.67365277 C9.28240567,6.2908784 9.60778305,6 9.99597032,6 C10.3841576,6 10.709535,6.2908784 10.7495202,6.67365277 L10.7495202,9.21430535 L13.3204549,9.21430535 C13.7065773,9.25394382 14,9.57649984 14,9.96132113 C14,10.3461424 13.7065773,10.6686984 13.3204549,10.7083369 L13.3204549,10.7083369 Z" fill="#4D4D4E" className="color000000 svgShape">
                            </path>
                        </g>
                    </svg>
                </div>
            </div>
        </Fragment>
    );
};

export default Teams;
