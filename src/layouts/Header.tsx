import Iconify from '@/components/Iconify';
import useTitle from '@/hooks/useTitle';

const Header = () => {
    const title = useTitle();

    return (
        <header className="main-header">
            <nav className="navigation">
                <div className="logo">
                    <a href="#">
                        <h1>{title}</h1>
                    </a>
                </div>

                <div className="menu-btn">
                    <Iconify icon='solar:hamburger-menu-outline' sx={{ color: 'rgb(183 183 183)' }} />
                </div>
            </nav>
        </header>
    );
};

export default Header;
