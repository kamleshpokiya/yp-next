import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    isSidePanelOpen: boolean,
    currentProjectTab: string,
    projectDetailsId: null | string,
    editProjectId: null | string,
    currentEmployeeTab: string,
    editMemberId: null | string,
    currentTaskTab: string,
};

const initialState: InitialState = {
    isSidePanelOpen: true,
    currentProjectTab: 'newProjects',
    projectDetailsId: null,
    editProjectId: null,
    currentEmployeeTab: 'employees',
    editMemberId: null,
    currentTaskTab: 'tasks'
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
        }
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
} = actionsSlice.actions;
export default actionsSlice.reducer;
