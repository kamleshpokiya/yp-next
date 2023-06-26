// packages
import { useState } from 'react';


// useToggle hook
const useToggle = (initialValue?: boolean) => {
    const [isOpen, setIsOpen] = useState<boolean>(initialValue || false);

    const onOpen = () => setIsOpen(true);

    const onClose = () => setIsOpen(false);

    const onToggle = () => setIsOpen(prev => !prev);

    return { isOpen, onOpen, onClose, onToggle };
};

export default useToggle;