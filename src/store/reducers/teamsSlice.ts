import { createSlice } from '@reduxjs/toolkit';
import teams from '@/_mock/teams';
import { Team } from '@/types';
import { faker } from '@faker-js/faker';

const initialState: Team[] = teams;

export const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        onAddTeam: (state, action) => {
            const newTeam = {
                id: faker.datatype.uuid(),
                avatar: faker.internet.avatar(),
                ...action.payload,
            };

            state.push(newTeam);
        },

        onRemoveTeam: (state, action) => {
            return state.filter(team => team.id !== action.payload);
        },

        onRemoveMemberFromTeam: (state, action) => {
            const { teamId, memberId } = action.payload;

            return state.map(team => {
                if (team.id === teamId) {
                    return {
                        ...team,
                        memberIds: team.memberIds.filter(id => id !== memberId)
                    };
                }
                return team;
            });
        }
    }
});

export const { onAddTeam, onRemoveTeam, onRemoveMemberFromTeam } = teamsSlice.actions;
export default teamsSlice.reducer;