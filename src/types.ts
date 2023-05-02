// shared types

export type Member = {
    id: string,
    name: string,
    email: string,
    designation: string,
    avatar: string,
};

export type Team = {
    id: string,
    name: string,
    memberIds: string[],
    avatar: string,
};

export type Task = {
    id: string,
    projectId: string,
    title: string,
    description: string,
    createdDate: Date,
    dueDate: Date,
    categories: string[],
    memberIds?: string[],
    teamIds?: string[],
    status: 'Todo' | 'In Progress' | 'Completed',
    archived: boolean,
};

export type Project = {
    id: string,
    title: string,
    description: string,
    dueDate: Date,
    categories: string[],
    status: string,
    deadline: string,
    memberIds?: string[],
    teamIds?: string[]
};

export type Account = {
    firstName: string,
    lastName: string,
    mobileNumber: string,
    email: string,
    address: string,
    token?: string | null,
    password?: string | null,
    isLoggedIn?: boolean,
    avatar?: string | null,
};
