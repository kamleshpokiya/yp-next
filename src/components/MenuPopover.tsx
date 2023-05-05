// packages
import OutsideClickHandler from 'react-outside-click-handler';
import Link from 'next/link';
// hooks
import useToggle from '@/hooks/useToggle';


// types
type Action<T> = {
    title: string;
    href?: string;
    onClick?: () => void;
} & T;

type MenuPopoverProps<T> = {
    actions: Action<T>[];
};

const MenuPopover = <T,>({ actions }: MenuPopoverProps<T>) => {
    const { isOpen, onOpen, onClose } = useToggle();

    return (
        <div className="project-doct">
            <span onClick={(e) => {
                e.stopPropagation();
                onOpen();
            }} />

            {isOpen && (
                <OutsideClickHandler onOutsideClick={() => onClose()}>
                    <div className="droupdown-main-box">
                        <div className="droupdown">
                            <ul>
                                {actions.map(({ title, href = '#', onClick = () => { } }, index) => (
                                    <li key={index}>
                                        <Link href={href} onClick={onClick}>{title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </OutsideClickHandler>
            )}
        </div>
    );
};

export default MenuPopover;