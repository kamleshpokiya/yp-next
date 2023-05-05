// packages
import { createSlice } from '@reduxjs/toolkit';


type InitialState = {
    isSidePanelOpen: boolean,
    currentProjectTab: string,
    projectDetailsId: null | string,
    editProjectId: null | string,
    currentEmployeeTab: string,
    editMemberId: null | string,
    currentTaskTab: string,
    editTaskId: null | string,
    taskDetailsId: null | string,
    viewProjectId: null | string,
};

const initialState: InitialState = {
    isSidePanelOpen: true,
    currentProjectTab: 'newProjects',
    projectDetailsId: null,
    editProjectId: null,
    currentEmployeeTab: 'employees',
    editMemberId: null,
    currentTaskTab: 'tasks',
    editTaskId: null,
    taskDetailsId: null,
    viewProjectId: null,
};

export const actionsSlice = createSlice({
    name: 'actions',
    initialState,
    reducers: {
        // Side Panel Actions
        onSidePanelOpen: (state) => {
            state.isSidePanelOpen = true;
        },
        onSidePanelClose: (state) => {
            state.isSidePanelOpen = false;
        },

        // Tabs Actions
        onProjectTabChange: (state, action) => {
            state.projectDetailsId = null;
            state.editProjectId = null;
            state.currentProjectTab = action.payload;
        },
        onEmployeeTabChanage: (state, action) => {
            state.editMemberId = null;
            state.currentEmployeeTab = action.payload;
        },
        onTaskTabChange: (state, action) => { 
            state.taskDetailsId = null;
            state.editTaskId = null;
            state.currentTaskTab = action.payload;
        },

        // Member Actions
        handleEditMemberId: (state, action) => { 
            state.editMemberId = action.payload;
        },

        // Project Details Actions
        addProjectDetailsId: (state, action) => {
            state.projectDetailsId = action.payload;
        },
        removeProjectDetailsId: (state) => {
            state.projectDetailsId = null;
        },
        handleEditProjectId: (state, action) => {
            state.editProjectId = action.payload ?? null;
        },
        onViewProjectId: (state, action) => {
            state.viewProjectId = action.payload ?? null;
        },

        // Task Actions
        handleEditTaskId: (state, action) => {
            state.editTaskId = action.payload ?? null;
        },
        handleTaskDetailsId: (state, action) => {
            state.taskDetailsId = action.payload;
        },
    }
});

export const {
    onSidePanelOpen,
    onSidePanelClose,
    onProjectTabChange,
    addProjectDetailsId,
    removeProjectDetailsId,
    handleEditProjectId,
    onEmployeeTabChanage,
    handleEditMemberId,
    onTaskTabChange,
    handleEditTaskId,
    handleTaskDetailsId,
    onViewProjectId,
} = actionsSlice.actions;
export default actionsSlice.reducer;
