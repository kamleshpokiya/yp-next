// packages
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
// layouts
import NavBar from './NavBar';
import Header from './Header';
import SideBar from './SideBar';
import Auth from './auth';
// store
import { handleEditTaskId, removeProjectDetailsId } from '@/store/slices/actions';
import { getAccountIsLoggedIn } from '@/store/selectors/account';
// hooks
import useToggle from '@/hooks/useToggle';


// types
type LayoutProps = {
    children: ReactNode
};

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useToggle();
    const isLoggedIn = useSelector(getAccountIsLoggedIn);

    useEffect(() => {
        dispatch(removeProjectDetailsId());
        dispatch(handleEditTaskId(null));
    }, [router.asPath]);

    if (!isLoggedIn) {
        return (
            <Auth />
        );
    };

    return (
        <div className="page">
            <div className="wraper">
                <div className="row">
                    <div className="col-md-1 aside-content-box">
                        <OutsideClickHandler onOutsideClick={onClose}>
                            <NavBar isNavBarOpen={isOpen} />
                        </OutsideClickHandler>
                    </div>

                    <div className="col-md-12  col-lg-11">
                        <Header onNavBarOpen={onOpen} />

                        <section>
                            {children}

                            <SideBar />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
