// packages
import { createSlice } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
// _mock
import projects from '@/_mock/projects';
// types
import { Project } from '@/types';


const initialState: Project[] = projects;

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            const newProject = {
                ...action.payload,
                id: faker.datatype.uuid(),
            };
            state.push(newProject);
        },
        updateProject: (state, action) => {
            return state.map(project => {
                if (project.id === action.payload.id) {
                    return action.payload;
                }
                return project;
            });
        }
    }
});

export const { addProject, updateProject } = projectsSlice.actions;
export default projectsSlice.reducer;