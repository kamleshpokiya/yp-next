// packages
import { useRouter } from 'next/router';


const useTitle = () => {
    const router = useRouter();
    const { asPath } = router;
    let title: string;

    switch (asPath) {
        case '/employees':
            title = 'Employees';
            break;

        case '/teams':
            title = 'Teams';
            break;
        case '/my-account':
            title = 'My Account';
            break;

        case '/change-password':
            title = 'Change Password';
            break;
        
        case `/projects/${router.query.projectId}`:
            title = 'Tasks';
            break;

        default:
            title = 'Projects';
            break;
    }

    return title;
};

export default useTitle;