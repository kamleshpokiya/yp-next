// packages
import { StaticImageData } from 'next/image';
// images
import logo from './Yp-logo.png';
import attachment from './ss.png';
import teamMember from './team-2.jpg';
import boyAvatar from './boy.png';

// icons
import homeIcon from './home.svg';
import fileIcon from './listing-icon2.png';
import usersIcon from './listing-icon3.png';
import gentalmanIcon from './listing-icon4.png';
import shivLingIcon from './listing-icon5.png';
import payoutIcon from './listing-icon6.png';
import personIcon from './person.png';
import bellIcon from './bell.png';
import leftArrowIcon from './left-arrow.png';
import hamburgerIcon from './hamburger-menu.svg';
import plusIcon from './plus-icon.svg';
import documentInfoIcon from './project.png';
import documentEditIcon from './edit.png';
import SearchIcon from './search-icon.svg';
import ChevronRightIcon from './chevron-double-right.png';

// types
type Image = {
    src: StaticImageData,
    alt: string,
};

type Images = {
    [key: string]: Image,
};


const IMAGES:Images = {
    logo: {
        src: logo,
        alt: 'logo',
    },
    attachment: {
        src: attachment,
        alt: 'Attachment'
    },
    teamMember: {
        src: teamMember,
        alt: 'Team Member'
    },
    boyAvatar: {
        src: boyAvatar,
        alt: 'Boy Avatar'
    },
    homeIcon: {
        src: homeIcon,
        alt: 'home',
    },
    fileIcon: {
        src: fileIcon,
        alt: '',
    },
    usersIcon: {
        src: usersIcon,
        alt: '',
    },
    gentalmanIcon: {
        src: gentalmanIcon,
        alt: '',
    },
    shivLingIcon: {
        src: shivLingIcon,
        alt: '',
    },
    payoutIcon: {
        src: payoutIcon,
        alt: '',
    },
    personIcon: {
        src: personIcon,
        alt: 'account',
    },
    bellIcon: {
        src: bellIcon,
        alt: 'notifications',
    },
    leftArrowIcon: {
        src: leftArrowIcon,
        alt: 'direction'
    },
    hamburgerIcon: {
        src: hamburgerIcon,
        alt: 'toggle-menu'
    },
    plusIcon: {
        src: plusIcon,
        alt: 'add'
    },
    documentInfoIcon: {
        src: documentInfoIcon,
        alt: 'view details',
    },
    documentEditIcon: {
        src: documentEditIcon,
        alt: 'edit project'
    },
    SearchIcon: {
        src: SearchIcon,
        alt: 'search'
    },
    ChevronRightIcon: {
        src: ChevronRightIcon,
        alt: ''
    }
};

export default IMAGES;