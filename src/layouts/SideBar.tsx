import Notifications from './Notifications';
import Iconify from '@/components/Iconify';

const SideBar = () => {
    return (
        <div className="msg-section">
            <div className="msg-listing">
                <ul className='sidebar-wrapper'>
                    <li className="active">
                        <a href="#">
                            <div className='hexagon-shape'>
                                <Iconify icon='material-symbols:person-rounded' width={30} sx={{ color: 'rgb(183 183 183)' }} />
                            </div>
                        </a>
                    </li>

                    <Notifications />
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
