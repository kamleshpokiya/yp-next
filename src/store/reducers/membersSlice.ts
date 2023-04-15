import { createSlice } from '@reduxjs/toolkit';
import members from '@/_mock/members';
import { Member } from '@/types';
import { faker } from '@faker-js/faker';

const initialState: Member[] = members;

export const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        addMember: (state, action) => {
            const newMember = {
                id: faker.datatype.uuid(),
                avatar: faker.internet.avatar(),
                ...action.payload,
                designation: action.payload.designation?.value,
            };
            state.push(newMember);
        },
        onRemoveMember: (state, action) => {
            return state.filter(member => {
                return member.id !== action.payload;
            });
        },
        updateMember: (state, action) => {
            const updatedMember = {
                ...action.payload,
                designation: action.payload.designation?.value,
            };
            return state.map(member => {
                if (member.id === action.payload.id) {
                    return updatedMember;
                }
                return member;
            });
        }
    }
});

export const { addMember, onRemoveMember, updateMember } = membersSlice.actions;
export default membersSlice.reducer;