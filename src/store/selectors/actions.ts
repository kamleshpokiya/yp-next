// store
import { RootState } from '../rootReducer';

export const getViewProjectId = (state: RootState) => {
    return state.actions.viewProjectId;
}

export const getIsSidePanelOpen = (state: RootState) => {
    return state.actions.isSidePanelOpen;
}

export const getEditMemberId = (state: RootState) => {
    return state.actions.editMemberId;
}

export const getCurrentTaskTab = (state: RootState) => {
    return state.actions.currentTaskTab;
}

export const getTaskDetailsId = (state: RootState) => {
    return state.actions.taskDetailsId;
}

export const getCurrentProjectTab = (state: RootState) => {
    return state.actions.currentProjectTab;
}

export const getCurrentEmployeeTab = (state: RootState) => {
    return state.actions.currentEmployeeTab;
}

export const getEditProjectId = (state: RootState) => {
    return state.actions.editProjectId;
}

export const getEditTaskId = (state: RootState) => {
    return state.actions.editTaskId;
}

export const getProjectDetailsId = (state: RootState) => {
    return state.actions.projectDetailsId;
}