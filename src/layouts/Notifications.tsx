import IMAGES from '@/assets/img';
import useToggle from '@/hooks/useToggle';
import Image from 'next/image';
import OutsideClickHandler from 'react-outside-click-handler';
import notifications from '@/_mock/notifications';
import Iconify from '@/components/Iconify';


const Notifications = () => {
    const { isOpen, onToggle, onClose } = useToggle();

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
