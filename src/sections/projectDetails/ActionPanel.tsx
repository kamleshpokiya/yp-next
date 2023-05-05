// packages
import { useSelector, useDispatch } from 'react-redux';
// sections
import ActionButton from '@/sections/common/ActionButton';
import PanelWrap from '@/sections/common/PanelWrap';
// store
import { onTaskTabChange } from '@/store/slices/actions';
import { getCurrentTaskTab } from '@/store/selectors/actions';


// types
type TaskTab = {
    type: string,
    label: string,
    href: string,
};

const taskTabs: TaskTab[] = [
    {
        type: 'tasks',
        label: 'Tasks',
        href: 'tasks',
    },
    {
        type: 'archived',
        label: 'Archived',
        href: 'archived',
    },
];

const ActionPanel = () => {
    const dispatch = useDispatch();
    const currentTab = useSelector(getCurrentTaskTab);

    const handleTabChange = (tab: string) => {
        dispatch(onTaskTabChange(tab));
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
                    label="Add Task"
                    onClick={() => handleTabChange('addTask')}
                    className={currentTab === 'addTask' ? 'active' : ''}
                />

                {taskTabs && taskTabs.map(({ type, label, href }, key) => (
                    <a
                        className={`nav-link project-cls-cstm ${type === currentTab && 'active'}`}
                        key={key}
                        onClick={() => handleTabChange(type)}
                        data-toggle="pill"
                        id="v-pills-home-tab"
                        href={`#${href}`}
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
