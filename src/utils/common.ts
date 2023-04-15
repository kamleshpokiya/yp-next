import { sampleSize, random } from "lodash";
import { Member, Team } from "@/types";

export const getMembersIds = (members: Member[]) => {
    return sampleSize(members, random(3, members.length)).map(obj => obj.id);
}

export const getTeamsIds = (teams: Team[]) => {
    return sampleSize(teams, random(3, teams.length)).map(obj => obj.id);
}