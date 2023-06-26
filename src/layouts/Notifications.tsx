// packages
import OutsideClickHandler from 'react-outside-click-handler';
// hooks
import useToggle from '@/hooks/useToggle';
// _mock
import notifications from '@/_mock/notifications';
// components
import Iconify from '@/components/Iconify';


// notification popup component
const Notifications = () => {
    const { isOpen, onToggle, onClose } = useToggle();

    // 1. The notifications functionality is currently implemented using static data.
    // 2. To add read time notifications functionality, backend functionality needs to be implemented.

    return (
        <li className="notification right-side-icon" id="active" >
            <a href="#" onClick={onToggle}>
                <div className='hexagon-shape'>
                    <Iconify icon='mdi:bell' width={25} sx={{ color: 'rgb(183 183 183)' }} />
                </div>
            </a>

            <OutsideClickHandler onOutsideClick={() => onClose()}>
                <div className={`droupdown-main-box ${isOpen ? 'opened' : ''}`}>
                    <div className="droupdown">
                        <div className="notification-title-box">
                            <h3>Notifications</h3>
                        </div>
                        <div className="notification-box">
                            {notifications.map(({ title, description }, key) => (
                                <div className="alert alert-warn" key={key}>
                                    <h4>{title}</h4>
                                    <p>{description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="notification-btn">
                            <a href="#"> View All</a>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </li>
    );
};

export default Notifications;
