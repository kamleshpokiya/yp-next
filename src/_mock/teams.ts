// packages
import { faker } from '@faker-js/faker';
// types
import { Team } from '@/types';
// _mock
import members from './members';
// utils
import { getMembersIds } from '@/utils/common';

const teamNames = [
    'Blue Lightning',
    'Phoenix Rising',
    'Stealth Squad',
    'Fusion Force',
    'Maverick Minds',
    'Golden Eagles',
    'InnovateIQ',
    'Tech Titans',
    'Nexus Ninjas',
    'Future Fusion',
];

const teams: Team[] = new Array(10).fill(0).map((_, index) => ({
    id: faker.datatype.uuid(),
    name: teamNames[index],
    memberIds: getMembersIds(members),
    avatar: faker.internet.avatar(),
}));

export default teams;