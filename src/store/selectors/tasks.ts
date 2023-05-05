// store
import { RootState } from '../rootReducer';


export const getTasksByProjectId = (state: RootState, projectId: string | string[] | undefined) => {
    if (!projectId) return [];
    return state.tasks.filter((task) => task.projectId === projectId);
}

export const getTaskById = (state: RootState, id: string | null) => {
    if (!id) return null;
    return state.tasks.find((task) => task.id === id);
}

export const getArchivedTasksByProjectId = (state: RootState, projectId: string | string[] | undefined) => {
    if (!projectId) return null;
    return state.tasks.filter((task) => task.projectId === projectId && task.status === 'Archived');
}