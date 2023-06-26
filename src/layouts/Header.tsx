// packages
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
// components
import Iconify from '@/components/Iconify';
// hooks
import useTitle from '@/hooks/useTitle';
// store
import { onViewProjectId } from '@/store/slices/actions';
import { getViewProjectId } from '@/store/selectors/actions';


// types
type HeaderProps = {
    onNavBarOpen: () => void,
};

// header component
const Header = ({ onNavBarOpen }: HeaderProps) => {
    const title = useTitle();
    const router = useRouter();
    const projectId = router.query.projectId;
    const dispatch = useDispatch();
    const viewProjectId = useSelector(getViewProjectId);
    const isProjectDetailsPage = router.asPath.includes(`/projects/${projectId}`);

    // toggle project id to show/hide project card on project details page
    const onViewProject = () => {
        dispatch(onViewProjectId(viewProjectId ? null : projectId));
    };

    return (
        <header className="main-header">
            <nav className="navigation">
                <div className="logo">
                    <a href="#">
                        <h1>{title}</h1>
                    </a>
                </div>
                {isProjectDetailsPage && (
                    <div className="list">
                        <div className="open-listing-btn">
                            <a href="#" className={`open-list ${viewProjectId ? 'routed' : ''}`} onClick={onViewProject}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 22 22" viewBox="0 0 22 22" id="down-arrow">
                                        <path d="M16.9,9.2c-0.4-0.4-1-0.4-1.4,0L12,12.7L8.5,9.2c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l4.2,4.2c0.2,0.2,0.4,0.3,0.7,0.3
                                      c0.3,0,0.5-0.1,0.7-0.3l4.2-4.2C17.3,10.2,17.3,9.6,16.9,9.2z" />
                                    </svg>
                                </span>
                                <span>View Project</span>
                            </a>
                        </div>
                    </div>
                )}

                <div className="menu-btn" onClick={onNavBarOpen}>
                    <Iconify icon='solar:hamburger-menu-outline' sx={{ color: 'rgb(183 183 183)' }} />
                </div>
            </nav>
        </header>
    );
};

export default Header;
