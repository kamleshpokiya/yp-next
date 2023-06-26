// packages
import { sampleSize, random } from 'lodash';
// types
import { Member, Team } from '@/types';


// get random ids from members
export const getMembersIds = (members: Member[]) => {
    return sampleSize(members, random(3, members.length)).map(obj => obj.id);
}

// get random ids from teams
export const getTeamsIds = (teams: Team[]) => {
    return sampleSize(teams, random(3, teams.length)).map(obj => obj.id);
}

// filter item by search query
export const filterBySearchQuery = <T,>(items: T[], searchQuery: string, key: keyof T) => {
    return items.filter((item: any) => item[key].toString().toLowerCase().includes(searchQuery.toLowerCase()));
}