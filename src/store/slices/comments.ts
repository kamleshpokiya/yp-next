// packages
import { faker } from '@faker-js/faker';
import { createSlice } from '@reduxjs/toolkit';


// types
type Comment = {
    id: string,
    taskId: string,
    commenter: string,
    comment: string,
    date: Date,
};

const initialState: Comment[] = [];

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => { 
            const newComment = {
                id: faker.datatype.uuid(),
                date: new Date(faker.date.recent()).toISOString(),
                ...action.payload,
            };
            state.unshift(newComment);
        }
    }
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;