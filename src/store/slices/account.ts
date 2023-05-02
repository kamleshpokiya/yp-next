// packages
import { createSlice } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
// types
import { Account } from '@/types';


const initialState: Account = {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    address: '',
    password: null,
    isLoggedIn: false,
    avatar: faker.internet.avatar(),
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        updateAccount: (state, action) => {
            return action.payload;
        },

        handleSingnUp: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },

        handleSingnIn: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },

        handleSingnOut: (state) => {
            return {
                ...state,
                isLoggedIn: false,
            };
        },

        updatePassword: (state, action) => {
            return {
                ...state,
                password: action.payload,
            };
        },
    },
});

export const { updateAccount, handleSingnUp, handleSingnIn, handleSingnOut, updatePassword } = accountSlice.actions;
export default accountSlice.reducer;