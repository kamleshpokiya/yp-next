import ActionButton from '@/sections/common/ActionButton';
import PanelWrap from '../common/PanelWrap';
import { useSelector, useDispatch } from 'react-redux';
import { onProjectTabChange } from '@/store/reducers/actionsSlice';
import { RootState } from '@/store/reducers';

type ProjectTabs = {
    type: string,
    label: string,
    href: string,
};

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

const ActionPanel = () => {
    const dispatch = useDispatch();
    const currentTab = useSelector((state: RootState) => state.actions.currentProjectTab);

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
