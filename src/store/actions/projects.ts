import { RootState } from "../reducers";

export const getProjectsByStatus = (state: RootState, status: string) => {
    if (status === 'newProjects') {
        return state.projects.filter((project) => project.status === 'Pending Allocation');
    }

    if (status === 'inProgressProjects') {
        return state.projects.filter((project) => project.status === 'In Progress');
    }

    return state.projects.filter((project) => project.status === 'Completed');
}

export const getProjectById = (state: RootState, id: string | null) => {
    if (!id) return null;
    return state.projects.find((project) => project.id === id);
}