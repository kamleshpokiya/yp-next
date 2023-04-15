import { useRouter } from "next/router";

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

        default:
            title = 'Projects';
            break;
    }

    return title;
};

export default useTitle;