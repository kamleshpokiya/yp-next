// packages
import { combineReducers } from '@reduxjs/toolkit';
// store
import actions from './slices/actions';
import members from './slices/members';
import tasks from './slices/tasks';
import teams from './slices/teams';
import projects from './slices/projects';
import account from './slices/account';
import comments from './slices/comments';


const rootReducer = combineReducers({
    actions,
    members,
    tasks,
    teams,
    projects,
    account,
    comments,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;