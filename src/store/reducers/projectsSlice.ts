import { createSlice } from '@reduxjs/toolkit';
import projects from '@/_mock/projects';
import { faker } from '@faker-js/faker';
import { Project } from '@/types';

const initialState: Project[] = projects;

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            const newProject = {
                id: faker.datatype.uuid(),
                ...action.payload,
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