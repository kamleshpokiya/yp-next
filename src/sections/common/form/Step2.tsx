// packages
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
// types
import { Project, Task } from '@/types';
// components
import Assigners from '@/components/Assigners';
import SearchField from '@/components/SearchField';
// store
import { getAllMembers } from '@/store/selectors/members';
import { getAllTeams } from '@/store/selectors/teams';
// utils
import { filterBySearchQuery } from '@/utils/common';


// types
type FormatedCategory = {
    id: string,
    label: string,
    value: string,
};

type Step2Props = {
    onNext: (values: Project | Task, isLastStep?: boolean) => void,
    onPrev: (values: Project | Task) => void,
    data: Project | Task,
};

const validationSchema = Yup.object({
    assignedMembersIds: Yup.array().of(Yup.string()),
});

const Step2 = ({ onNext, onPrev, data }: Step2Props) => {
    const [searchMemberQuery, setSearchMemberQuery] = useState<string>('');
    const [searchTeamQuery, setSearchTeamQuery] = useState<string>('');
    const [checkedMembers, setCheckedMembers] = useState<string[]>(data?.memberIds ?? []);
    const [checkedTeams, setCheckedTeams] = useState<string[]>(data.teamIds ?? []);
    const members = useSelector(getAllMembers);
    const teams = useSelector(getAllTeams);
    const isSearchMemberQuery = searchMemberQuery.trim() !== '';
    const isSearchTeamQuery = searchTeamQuery.trim() !== '';

    const getMembersBySearchedQuery = () => {
        return members.filter((member) => member.name.toLowerCase().includes(searchMemberQuery.toLowerCase()));
    }

    const getTeamsBySearchedQuery = () => {
        return teams.filter((team) => team.name.toLowerCase().includes(searchTeamQuery.toLowerCase()));
    }

    const filteredMembers = isSearchMemberQuery ? filterBySearchQuery(members, searchMemberQuery, 'name') : members;
    const filteredTeams = isSearchTeamQuery ? filterBySearchQuery(teams, searchTeamQuery, 'name') : teams;


    const formateMember = (member: any) => ({
        id: member?.id,
        name: member?.name,
        avatar: member?.avatar,
        description: member?.designation,
    });

    const formateTeam = (team: any) => ({
        id: team?.id,
        name: team?.name,
        avatar: team?.avatar,
        description: team?.memberIds.length ? `${team?.memberIds.length} members` : '',
    });

    const formatedMembers = filteredMembers.map(formateMember);
    const formatedTeams = filteredTeams.map(formateTeam);

    const mergeAll = (values: Project | Task) => ({
        ...values,
        status: (checkedMembers.length > 0 || checkedTeams.length > 0) ? 'In Progress' : 'Pending Allocation',
        memberIds: checkedMembers,
        teamIds: checkedTeams,
        deadline: 'Pending Allocation',
    });

    const handleNext = (values: Project | Task) => {
        const newValues = mergeAll(values);
        onNext(newValues);
    }

    const handlePrev = (values: Project | Task) => {
        const newValues = mergeAll(values);
        onPrev(newValues);
    }

    return (
        <div className="main active form-step-3">
            <div className="sign-up-wrapper login-account">
                <div className=" login-form survey-form">
                    <div className="account-box">
                        <div className="input-main-box">
                            <Formik
                                initialValues={data}
                                validationSchema={validationSchema}
                                onSubmit={(values) => handleNext(values)}
                            >
                                {({ values }) => (
                                    <Form>
                                        <div className="input">
                                            <label>Assign</label>
                                            <div className="main-search-box row assign-card-wrapper">
                                                <div className="first-box col-xl-6">
                                                    <SearchField
                                                        value={searchMemberQuery}
                                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchMemberQuery(e.target.value)}
                                                        placeholder='Search users here...'
                                                    />
                                                    <Assigners
                                                        assigners={formatedMembers}
                                                        isSelectable
                                                        checkedList={checkedMembers}
                                                        setCheckedList={setCheckedMembers}
                                                    />
                                                </div>
                                                <div className="secend-box col-xl-6">
                                                    <SearchField
                                                        value={searchTeamQuery}
                                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTeamQuery(e.target.value)}
                                                        placeholder='Search teams here...'
                                                    />
                                                    <Assigners
                                                        assigners={formatedTeams}
                                                        isSelectable
                                                        checkedList={checkedTeams}
                                                        setCheckedList={setCheckedTeams}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="buttons button_space">
                                            <button className="star-btn pre_button" onClick={() => handlePrev(values)}>Previous</button>
                                            <button className=" next_button star-btn" type='submit'>Next</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2;
