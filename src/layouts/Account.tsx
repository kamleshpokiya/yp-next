// packages
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
// components
import Iconify from '@/components/Iconify';
// hooks
import useToggle from '@/hooks/useToggle';
// store
import { handleSingnOut } from '@/store/slices/account';
import { getAccountAvatar } from '@/store/selectors/account';


// account popup component
const Account = () => {
    const { isOpen, onToggle, onClose } = useToggle();
    const avatar = useSelector(getAccountAvatar);
    const dispatch = useDispatch();

    return (
        <li className="active">
            <a href="#" onClick={() => onToggle()}>
                <div className='hexagon-shape'>
                    {avatar ? (
                        <Image src={avatar} alt="Avatar" width={100} height={100} style={{ objectFit: 'cover' }} />
                    ) : (
                        <Iconify icon='material-symbols:person-rounded' width={30} sx={{ color: 'rgb(183 183 183)' }} />
                    )}
                </div>
            </a>

            <OutsideClickHandler onOutsideClick={() => onClose()}>
                <div className="profile-ditels-main-box">
                    <div className={`profile-ditels droupdown-main-box ${isOpen ? 'opened' : ''}`}>
                        <ul>
                            <li><Link href="/my-account">My account</Link></li>
                            <li><Link href="/change-password">Change password</Link></li>
                            <li style={{ borderBottom: 'none', cursor: 'pointer' }} onClick={() => dispatch(handleSingnOut())}>
                                <button className='signout-button'>Sign Out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </OutsideClickHandler>
        </li>
    );
};

export default Account;