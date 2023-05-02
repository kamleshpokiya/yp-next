// packages
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// types
import { Member, Project, Task, Team } from '@/types';
// components
import SearchBox from '@/components/SearchBox';
import Assigners from '@/components/Assigners';
// store
import { RootState } from '@/store/rootReducer';


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
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [checkedMembers, setCheckedMembers] = useState<string[]>(data?.memberIds ?? []);
    const [checkedTeams, setCheckedTeams] = useState<string[]>(data.teamIds ?? []);

    const members = useSelector((state: RootState) => state.members);
    const teams = useSelector((state: RootState) => state.teams);

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

    const formatedMembers = members.map(formateMember);
    const formatedMember = formateMember(selectedMember);

    const formatedTeams = teams.map(formateTeam);
    const formatedTeam = formateTeam(selectedTeam);

    const onSelectMember = (selected: Member | null) => {
        setSelectedMember(selected);
    };

    const onSelectTeam = (selected: Team | null) => {
        setSelectedTeam(selected);
    };

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
        <div className="main active">
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
                                            <div className="main-search-box row">
                                                <div className="first-box col-xl-6">
                                                    <SearchBox
                                                        options={members}
                                                        value={selectedMember}
                                                        onChange={onSelectMember}
                                                        placeholder="Search Here User..."
                                                        getOptionLabel={(option: Member) => option.name}
                                                    />
                                                    <Assigners
                                                        assigners={selectedMember ? [formatedMember] : formatedMembers}
                                                        isSelectable
                                                        checkedList={checkedMembers}
                                                        setCheckedList={setCheckedMembers}
                                                    />
                                                </div>
                                                <div className="secend-box col-xl-6">
                                                    <SearchBox
                                                        options={teams}
                                                        value={selectedTeam}
                                                        onChange={onSelectTeam}
                                                        placeholder="Search Here Team..."
                                                        getOptionLabel={(option: Member) => option.name}
                                                    />
                                                    <Assigners
                                                        assigners={selectedTeam ? [formatedTeam] : formatedTeams}
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
