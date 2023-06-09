// packages
import { useSelector, useDispatch } from 'react-redux';
// sections
import ActionButton from '@/sections/common/ActionButton';
import PanelWrap from '@/sections/common/PanelWrap';
// store
import { onProjectTabChange } from '@/store/slices/actions';
import { getCurrentProjectTab } from '@/store/selectors/actions';


// types
type ProjectTabs = {
    type: string,
    label: string,
    href: string,
};

// project tabs
const projectTabs: ProjectTabs[] = [
    {
        type: 'newProjects',
        label: 'New Project',
        href: 'new-project',
    },
    {
        type: 'inProgressProjects',
        label: 'In Progress',
        href: 'in-progress',
    },
    {
        type: 'completedProjects',
        label: 'Completed',
        href: 'completed',
    },
];

// project action panel component
const ActionPanel = () => {
    const dispatch = useDispatch();
    const currentTab = useSelector(getCurrentProjectTab);

    // change project tab
    const handleTabChange = (tab: string) => {
        dispatch(onProjectTabChange(tab));
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
                    label="Add Project"
                    onClick={() => handleTabChange('addProject')}
                    className={currentTab === 'addProject' ? 'active' : ''}
                />

                {projectTabs && projectTabs.map(({ type, label, href }, key) => (
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
