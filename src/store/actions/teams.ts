import { RootState } from "../reducers";

export const getTeam = (state: RootState, id: string) => {
    return state.teams.find((team) => team.id === id);
};

export const getTeams = (state: RootState, ids: string[] | undefined) => {
    return state.teams.filter((team) => ids?.includes(team.id));
};

