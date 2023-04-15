import { ReactNode } from 'react';
import NavBar from './NavBar';
import Header from './Header';
import SideBar from './SideBar';

type LayoutProps = {
    children: ReactNode
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="page">
            <div className="wraper">
                <div className="row">
                    <div className="col-md-1 aside-content-box">
                        <NavBar />
                    </div>

                    <div className="col-md-12  col-lg-11">
                        <Header />

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
