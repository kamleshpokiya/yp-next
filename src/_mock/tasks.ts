import { faker } from '@faker-js/faker';
import { Task } from '@/types';
import projects from './projects';
import members from './members';
import teams from './teams';
import { getMembersIds, getTeamsIds } from '@/utils/common';


const tasks: Task[] = [
    {
        id: faker.datatype.uuid(),
        projectId: projects[0].id,
        title: 'Make an data grid table with dynamic fields',
        description: faker.lorem.paragraph(),
        createdDate: faker.date.recent(),
        dueDate: faker.date.future(),
        categories: ['Content creation and management', 'Data analysis and visualization'],
        memberIds: getMembersIds(members),
        teamIds: getTeamsIds(teams),
        status: 'In Progress',
        archived: false,
    },
    {
        id: faker.datatype.uuid(),
        projectId: projects[0].id,
        title: 'Make APIs for users in backend',
        description: faker.lorem.paragraph(),
        createdDate: faker.date.recent(),
        dueDate: faker.date.future(),
        categories: ['Financial Technology', 'Game development'],
        memberIds: getMembersIds(members),
        teamIds: getTeamsIds(teams),
        status: 'Todo',
        archived: false,
    },
    {
        id: faker.datatype.uuid(),
        projectId: projects[0].id,
        title: 'Structure the project',
        description: faker.lorem.paragraph(),
        createdDate: faker.date.recent(),
        dueDate: faker.date.future(),
        categories: ['Financial Technology', 'Trading Solutions', 'Content creation and management'],
        memberIds: getMembersIds(members),
        teamIds: getTeamsIds(teams),
        status: 'Completed',
        archived: false,
    },
    {
        id: faker.datatype.uuid(),
        projectId: projects[0].id,
        title: 'Make project design and wireframes',
        description: faker.lorem.paragraph(),
        createdDate: faker.date.recent(),
        dueDate: faker.date.future(),
        categories: ['Mobile app development', 'Software development', 'Web development'],
        memberIds: getMembersIds(members),
        teamIds: getTeamsIds(teams),
        status: 'Completed',
        archived: true,
    },
];

export default tasks;