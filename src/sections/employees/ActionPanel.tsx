// packages
import { useSelector, useDispatch } from 'react-redux';
// sections
import ActionButton from '@/sections/common/ActionButton';
import PanelWrap from '@/sections/common/PanelWrap';
// store
import { onEmployeeTabChanage } from '@/store/slices/actions';
import { RootState } from '@/store/rootReducer';


// types
type EmployeeTab = {
    type: string,
    label: string,
    href: string,
};

const employeeTabs: EmployeeTab[] = [
    {
        type: 'employees',
        label: 'Employees',
        href: 'employees',
    },
];

const ActionPanel = () => {
    const dispatch = useDispatch();
    const currentTab = useSelector((state: RootState) => state.actions.currentEmployeeTab);

    const handleTabChange = (tab: string) => {
        dispatch(onEmployeeTabChanage(tab));
    }

    return (
        <PanelWrap>
            <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
            >
                <ActionButton
                    label="Add New"
                    onClick={() => handleTabChange('addEmployee')}
                    className={currentTab === 'addEmployee' ? 'active' : ''}
                />

                {employeeTabs && employeeTabs.map(({ type, label, href }, key) => (
                    <a
                        className={`nav-link project-cls-cstm ${type === currentTab && 'active'}`}
                        key={key}
                        onClick={() => handleTabChange(type)}
                        data-toggle="pill"
                        id="v-pills-home-tab"
                        href="#"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                    >{label}</a>
                ))}
            </div>
        </PanelWrap>
    );
};

export default ActionPanel;
