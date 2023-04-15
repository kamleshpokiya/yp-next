import tasks from '@/_mock/tasks';
import { Task } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Task[] = tasks;

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
    }
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;