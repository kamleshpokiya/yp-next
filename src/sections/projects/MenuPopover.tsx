// packages
import Link from 'next/link';
import OutsideClickHandler from 'react-outside-click-handler';
// hooks
import useToggle from '@/hooks/useToggle';


// types
type MenuPopoverProps = {
    id: string | undefined,
};

const MenuPopover = ({ id }: MenuPopoverProps) => {
    const { isOpen, onOpen, onClose } = useToggle();

    return (
        <div className="project-doct">
            <span onClick={() => onOpen()} />

            {isOpen && (
                <OutsideClickHandler onOutsideClick={() => onClose()}>
                    <div className="droupdown-main-box">
                        <div className="droupdown">
                            <ul>
                                <li>
                                    <a href="#">Edit Project</a>
                                </li>
                                <li>
                                    <a href="#">View Details</a>
                                </li>
                                <li>
                                    <Link href={`/projects/${id}`}>Manage Project</Link>
                                </li>
                                <li>
                                    <a href="#">Add Task</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </OutsideClickHandler>
            )}
        </div>
    );
};

export default MenuPopover;
