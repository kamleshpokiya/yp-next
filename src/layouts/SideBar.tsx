// layouts
import Account from './Account';
import Notifications from './Notifications';


const SideBar = () => {
    return (
        <div className="msg-section">
            <div className="msg-listing">
                <ul className='sidebar-wrapper'>
                    <Account />
                    <Notifications />
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
