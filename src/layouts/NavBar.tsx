// packages
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Tooltip } from 'react-tooltip';
import { useSelector, useDispatch } from 'react-redux';
// images
import IMAGES from '@/assets/images';
// store
import { onSidePanelOpen } from '@/store/slices/actions';
import { getIsSidePanelOpen } from '@/store/selectors/actions';
// components
import Iconify from '@/components/Iconify';
// layouts
import Account from './Account';
import Notifications from './Notifications';


// types
type NavBarProps = {
    isNavBarOpen: boolean,
};

type NavLinks<T> = {
    href: string,
    icon: string,
    label: string,
}[];

const {
    logo,
    leftArrowIcon
} = IMAGES;

type Icon = typeof logo;


// navigation links
const navLinks: NavLinks<Icon> = [
    {
        href: '/',
        icon: 'ic:round-home',
        label: 'Home',
    },
    {
        href: '#',
        icon: 'teenyicons:text-document-outline',
        label: 'Projects',
    },
    {
        href: '/employees',
        icon: 'fa-solid:users',
        label: 'Employees',
    },
    {
        href: '/teams',
        icon: 'material-symbols:person-3',
        label: 'Teams',
    },
    {
        href: '#',
        icon: 'mdi:grave-stone',
        label: 'Summery',
    },
    {
        href: '#',
        icon: 'pixelarticons:reciept',
        label: 'Payout',
    },
];

// navbar component
const NavBar = ({ isNavBarOpen }: NavBarProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isSidePanelOpen = useSelector(getIsSidePanelOpen);

    return (
        <aside>
            <div className={`aside-main-box ${isNavBarOpen ? 'asider' : ''}`}>
                <div className="aside-logo">
                    <Image src={logo.src} alt={logo.alt} />
                </div>
                <div className="aside-listing">
                    <ul className='nav-link-wrapper'>
                        {navLinks.map(({ href, icon, label }, key) => (
                            <li
                                key={key}
                                className="active"
                                data-tooltip-id='nav-link-tooltip'
                                data-tooltip-place='right'
                                data-tooltip-content={label}
                            >
                                <Link href={href} className={router.pathname === href ? 'isActive' : ''}>
                                    <div className='hexagon-shape'>
                                        <Iconify icon={icon} width={30} sx={{ color: 'rgb(183 183 183)' }} />
                                    </div>
                                </Link>
                            </li>
                        ))}

                        {isNavBarOpen && (
                            <>
                                <Account />
                                <Notifications />
                            </>
                        )}
                    </ul>

                    <Tooltip id='nav-link-tooltip' style={{ zIndex: 99999 }} />
                </div>
            </div>

            {!isSidePanelOpen && (
                <div className="plus right-arrow" onClick={() => dispatch(onSidePanelOpen())} style={{ display: 'flex' }}>
                    <Image src={leftArrowIcon.src} alt={leftArrowIcon.alt} />
                </div>
            )}
        </aside>
    );
};

export default NavBar;



