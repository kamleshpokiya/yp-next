// packages
import { faker } from '@faker-js/faker';
// types
import { Project } from '@/types';
// utils
import { getMembersIds } from '@/utils/common';
// _mock
import members from './members';


const projects: Project[] = [
    {
        id: faker.datatype.uuid(),
        title: 'Hydrus',
        description: faker.lorem.paragraph(),
        dueDate: faker.date.future(),
        categories: ['Content creation and management', 'Data analysis and visualization'],
        status: 'Pending Allocation',
        deadline: 'Deadline',
        memberIds: getMembersIds(members),
        teamIds: [],
    },
    {
        id: faker.datatype.uuid(),
        title: 'Salem Ventures',
        description: faker.lorem.paragraph(),
        dueDate: faker.date.future(),
        categories: ['Content creation and management', 'Data analysis and visualization'],
        status: 'Pending Allocation',
        deadline: 'Deadline',
        memberIds: getMembersIds(members),
        teamIds: []
    },
    {
        id: faker.datatype.uuid(),
        title: 'SVX',
        description: faker.lorem.paragraph(),
        dueDate: faker.date.future(),
        categories: ['Financial Technology', 'Game development'],
        status: 'Pending Allocation',
        deadline: 'Deadline',
        memberIds: getMembersIds(members),
        teamIds: []
    },
    {
        id: faker.datatype.uuid(),
        title: 'Trade Socio',
        description: faker.lorem.paragraph(),
        dueDate: faker.date.future(),
        categories: ['Financial Technology', 'Trading Solutions', 'Content creation and management'],
        status: 'In Progress',
        deadline: 'Missing Deadline',
        memberIds: getMembersIds(members),
        teamIds: []
    },
    {
        id: faker.datatype.uuid(),
        title: 'Chatbot API',
        description: faker.lorem.paragraph(),
        dueDate: faker.date.future(),
        categories: ['Artificial intelligence and machine learning', 'Education and e-learning'],
        status: 'In Progress',
        deadline: 'Deadline',
        memberIds: getMembersIds(members),
        teamIds: []
    },
    {
        id: faker.datatype.uuid(),
        title: 'Codelink Infotech',
        description: faker.lorem.paragraph(),
        dueDate: faker.date.future(),
        categories: ['Mobile app development', 'Software development', 'Web development'],
        status: 'In Progress',
        deadline: 'Missing Deadline',
        memberIds: getMembersIds(members),
        teamIds: []
    },
    {
        id: faker.datatype.uuid(),
        title: 'Salem Foods',
        description: faker.lorem.paragraph(),
        dueDate: faker.date.future(),
        categories: ['Branding and Marketing Services', 'E-commerce', 'Education and e-learning'],
        status: 'Completed',
        deadline: 'Deadline',
        memberIds: getMembersIds(members),
        teamIds: []
    },
    {
        id: faker.datatype.uuid(),
        title: 'Your Promate',
        description: faker.lorem.paragraph(),
        dueDate: faker.date.future(),
        categories: ['Content creation and management', 'Social media management'],
        status: 'Completed',
        deadline: 'Deadline',
        memberIds: getMembersIds(members),
        teamIds: []
    },
    {
        id: faker.datatype.uuid(),
        title: 'pluseIQ',
        description: faker.lorem.paragraph(),
        dueDate: faker.date.future(),
        categories: ['Digital marketing and advertising', 'E-commerce', 'Content creation and management'],
        status: 'Completed',
        deadline: 'Deadline',
        memberIds: getMembersIds(members),
        teamIds: []
    },
];

export default projects;