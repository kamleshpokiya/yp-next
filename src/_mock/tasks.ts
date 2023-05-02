// packages
import { faker } from '@faker-js/faker';
import { random, sample, sampleSize } from 'lodash';
// types
import { Task } from '@/types';
// _mock
import projects from './projects';
import members from './members';
import teams from './teams';
import categories from './categories';
// utils
import { getMembersIds, getTeamsIds } from '@/utils/common';


const tasks: Task[] = new Array(200).fill(0).map(() => ({
    id: faker.datatype.uuid(),
    projectId: sample(projects)?.id ?? projects[0].id,
    title: faker.lorem.words(2),
    description: faker.lorem.words(12),
    createdDate: faker.date.recent(),
    dueDate: faker.date.future(),
    categories: sampleSize(categories, random(1,2)),
    memberIds: getMembersIds(members),
    teamIds: getTeamsIds(teams),
    status: sample(['Todo', 'In Progress', 'Completed']) ?? 'Todo',
    archived: faker.datatype.boolean(),
}));

export default tasks;