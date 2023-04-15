import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '@/components/InputField';
import SearchBox from '@/components/SearchBox';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { useState } from 'react';
import { Member } from '@/types';
import Assigners from '@/components/Assigners';
import { useDispatch } from 'react-redux';
import { onAddTeam } from '@/store/reducers/teamsSlice';

const validationSchema = Yup.object({
    name: Yup.string().required('Please enter your team name'),
});

type InitialValue = {
    name: string,
};

const initialValues: InitialValue = {
    name: '',
};

const AddTeam = () => {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [checkedMembers, setCheckedMembers] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const members = useSelector((state: RootState) => state.members);
    const dispatch = useDispatch();

    const onSelectMember = (selected: Member | null) => {
        setSelectedMember(selected);
    };

    const formateMember = (member: any) => ({
        id: member?.id,
        name: member?.name,
        avatar: member?.avatar,
        description: member?.designation,
    });

    const formatedMembers = members.map(formateMember);
    const formatedMember = formateMember(selectedMember);

    const handleSubmit = (values: InitialValue) => {
        if (!checkedMembers.length) {
            setError('Please select atleast one member');
        } else {
            setError(null);
            const newValues = {
                ...values,
                memberIds: checkedMembers
            };

            dispatch(onAddTeam(newValues));
        }
    }

    return (
        <div className="col-md-8">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ values }) => (
                    <Form>
                        <div className="account-box">
                            <InputField
                                label="Team Name:"
                                name="name"
                                id="name"
                                type="text"
                                value={values.name}
                                placeholder="Enter your team name her..."
                            />
                            <div className="input-box input comment">
                                <div className="secend-box">
                                    <label id="name-label">
                                        Add employee:

                                        <SearchBox
                                            options={members}
                                            value={selectedMember}
                                            onChange={onSelectMember}
                                            placeholder="Search Here User..."
                                            getOptionLabel={(option: Member) => option.name}
                                            maxWidth="100%"
                                        />

                                        {error ? (
                                            <div className="error-msg" style={{ marginTop: '5px' }}>{error}</div>
                                        ) : null}
                                    </label>
                                    <Assigners
                                        assigners={selectedMember ? [formatedMember] : formatedMembers}
                                        isSelectable
                                        checkedList={checkedMembers}
                                        setCheckedList={setCheckedMembers}
                                    />
                                </div>

                                <div className="buttons">
                                    <button className="star-btn next_button" type='submit'>Add to team</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddTeam;
