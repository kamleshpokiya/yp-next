// packages
import { useState, useEffect } from 'react';


// useMediaQuery hook
const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    // listen media query
    useEffect(() => {
        const media = window.matchMedia(query);

        const listener = () => {
            setMatches(media.matches);
        };

        listener();

        media.addEventListener('change', listener);

        return () => {
            media.removeEventListener('change', listener);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;
