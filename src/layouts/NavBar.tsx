import IMAGES from '@/assets/img';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { onSidePanelOpen } from '@/store/reducers/actionsSlice';
import { RootState } from '@/store/reducers';
import { Tooltip } from 'react-tooltip';
import Iconify from '@/components/Iconify';

type NavLinks<T> = {
    href: string,
    icon: string,
    label: string,
}[];

const { logo, fileIcon, usersIcon, gentalmanIcon, shivLingIcon, payoutIcon, leftArrowIcon } = IMAGES;

type Icon = typeof logo;

const navLinks: NavLinks<Icon> = [
    {
        href: '/',
        icon: 'ic:round-home',
        label: 'Home',
    },
    {
        href: '/projects',
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
        href: '/summery',
        icon: 'mdi:grave-stone',
        label: 'Summery',
    },
    {
        href: '/payout',
        icon: 'pixelarticons:reciept',
        label: 'Payout',
    },
];


const NavBar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isSidePanelOpen = useSelector((state: RootState) => state.actions.isSidePanelOpen);

    return (
        <aside>
            <div className="aside-main-box">
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
                    </ul>

                    <Tooltip id='nav-link-tooltip' />
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



