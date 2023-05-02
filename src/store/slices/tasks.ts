// packages
import { faker } from '@faker-js/faker';
import { createSlice } from '@reduxjs/toolkit';
// _mock
import tasks from '@/_mock/tasks';
// types
import { Task } from '@/types';


const initialState: Task[] = tasks;

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                ...action.payload,
                id: faker.datatype.uuid(),
                createdDate: new Date(faker.date.recent()).toISOString(),
            };
            state.push(newTask);
        },
        updateTask: (state, action) => {
            return state.map(task => {
                if (task.id === action.payload.id) {
                    return action.payload;
                }
                return task;
            });
        },
        archivedTaskById: (state, action) => {
            return state.map(task => {
                if (task.id === action.payload) {
                    return {
                        ...task,
                        archived: true,
                    };
                }
                return task;
            });
        }
    }
});

export const { addTask, updateTask, archivedTaskById } = tasksSlice.actions;
export default tasksSlice.reducer;