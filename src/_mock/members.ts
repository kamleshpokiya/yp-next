// packages
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// types
import { Member } from '@/types';
// _mock
import designations from './designations';


const members: Member[] = new Array(10).fill(0).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    designation: sample(designations) || 'Business Analyst',
    avatar: faker.internet.avatar(),
}));

export default members;