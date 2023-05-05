// packages
import { useSelector } from 'react-redux';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Form, FormikHelpers } from 'formik';
// components
import InputField from '@/components/InputField';
import Assigners from '@/components/Assigners';
import SearchField from '@/components/SearchField';
// store
import { onAddTeam } from '@/store/slices/teams';
import { getAllMembers } from '@/store/selectors/members';


// types
type AddTeamProps = {
    onClose: () => void,
};

const validationSchema = Yup.object({
    name: Yup.string().required('Please enter your team name.'),
});

type InitialValue = {
    name: string,
};

const initialValues: InitialValue = {
    name: '',
};

const AddTeam = ({ onClose }: AddTeamProps) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [checkedMembers, setCheckedMembers] = useState<string[]>([]);
    const dispatch = useDispatch();
    const members = useSelector(getAllMembers);
    const [error, setError] = useState<string | null>(null);
    const isSearchQuery = searchQuery.trim() !== '';

    const getMembersBySearchedQuery = () => {
        return members.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    const filteredMembers = isSearchQuery ? getMembersBySearchedQuery() : members;

    const formateMember = (member: any) => ({
        id: member?.id,
        name: member?.name,
        avatar: member?.avatar,
        description: member?.designation,
    });

    const formatedMembers = filteredMembers.map(formateMember);

    const onSubmit = (values: InitialValue, { resetForm }: FormikHelpers<InitialValue>) => {
        if (!checkedMembers.length) {
            setError('Please select atleast one member.');
        } else {
            setError(null);
            const newValues = {
                ...values,
                memberIds: checkedMembers
            };

            dispatch(onAddTeam(newValues));
            onClose();
            resetForm();
            setCheckedMembers([]);
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
                                placeholder="Enter your team name here..."
                            />
                            <div className="input-box input comment">
                                <div className="secend-box">
                                    <label id="name-label">
                                        Add Employees:
                                        <SearchField
                                            value={searchQuery}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                            placeholder='Search employees here...'
                                        />

                                        {error ? (
                                            <div className="error-msg" style={{ marginTop: '5px' }}>{error}</div>
                                        ) : null}
                                    </label>
                                    <Assigners
                                        assigners={formatedMembers}
                                        isSelectable
                                        checkedList={checkedMembers}
                                        setCheckedList={setCheckedMembers}
                                    />
                                </div>

                                <div className="buttons">
                                    <button className="star-btn next_button" type='submit'>Add Team</button>
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
