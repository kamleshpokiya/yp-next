import { combineReducers } from '@reduxjs/toolkit';
import actionsReducer from './actionsSlice';
import membersReducer from './membersSlice';
import tasksReducer from './tasksSlice';
import teamsReducer from './teamsSlice';
import projectsReducer from './projectsSlice';

const rootReducer = combineReducers({
    actions: actionsReducer,
    members: membersReducer,
    tasks: tasksReducer,
    teams: teamsReducer,
    projects: projectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;