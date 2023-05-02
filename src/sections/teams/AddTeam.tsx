// packages
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Form, FormikHelpers } from 'formik';
// components
import InputField from '@/components/InputField';
import SearchBox from '@/components/SearchBox';
import Assigners from '@/components/Assigners';
// store
import { RootState } from '@/store/rootReducer';
import { onAddTeam } from '@/store/slices/teams';
// types
import { Member } from '@/types';


// types
type AddTeamProps = {
    onClose: () => void,
};

const validationSchema = Yup.object({
    name: Yup.string().required('Please enter your team name'),
});

type InitialValue = {
    name: string,
};

const initialValues: InitialValue = {
    name: '',
};

const AddTeam = ({ onClose }: AddTeamProps) => {
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

    const onSubmit = (values: InitialValue, { resetForm }: FormikHelpers<InitialValue>) => {
        if (!checkedMembers.length) {
            setError('Please select atleast one member');
        } else {
            setError(null);
            const newValues = {
                ...values,
                memberIds: checkedMembers
            };

            dispatch(onAddTeam(newValues));
            onClose();
            resetForm();
        }
    }

    return (
        <div className="col-md-8">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
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
