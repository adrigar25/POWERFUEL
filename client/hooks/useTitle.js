import { useEffect } from 'react';
import { useAppContext } from '@context/AppContext';

const useTitle = (title) => {
    const { setWebTitle } = useAppContext();

    useEffect(() => {
        setWebTitle(title);
    }, [title, setWebTitle]);

    const setTitle = (newTitle) => {
        setWebTitle(newTitle);
    }

    return { setTitle };
};

export default useTitle;