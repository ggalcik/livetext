import { useEffect } from 'react';

const useTitle = (title: string) => {
    useEffect(() => {
        const defaultTitle = "livetext";
        if (!title.trim()) {
            document.title = defaultTitle;
            return;
        }

        document.title = `${defaultTitle} - ${title}`;
    }, [title]); // Re-run the effect if the title changes
};

export default useTitle;