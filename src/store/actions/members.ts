import { RootState } from "../reducers";

export const getMember = (state: RootState, id: string | null) => {
    if (!id) return null;
    return state.members.find((member) => member.id === id);
};

export const getMembers = (state: RootState, ids: string[] | undefined) => {
    return state.members.filter((member) => ids?.includes(member.id));
};

