import { RootState } from '../reducers';

export const getTasksByProjectId = (state: RootState, projectId: string | string[] | undefined) => {
    if (!projectId) return [];
    return state.tasks.filter((task) => task.projectId === projectId);
}