// packages
import Image from 'next/image';
import { useMemo } from 'react';
import { Tooltip } from 'react-tooltip';
import { useDispatch } from 'react-redux';
// components
import Chip from '@/components/Chip';
import MenuPopover from '@/components/MenuPopover';
// types
import { Task } from '@/types';
// utils
import { formatDate } from '@/utils/formatDate';
// images
import IMAGES from '@/assets/images';
// store
import { handleEditTaskId, handleTaskDetailsId, onTaskTabChange } from '@/store/slices/actions';


type Action = {
    title: string,
    href?: string,
    onClick?: (e?: any) => void,
};

type TaskCardProps = Task & {
    moveButton?: {
        title: string,
        onClick: () => void,
    }
}

const TaskCard = ({
    id,
    title,
    description,
    dueDate,
    categories,
    moveButton,
}: TaskCardProps) => {
    const dispatch = useDispatch();
    const { documentInfoIcon, documentEditIcon } = IMAGES;

    const handleEditTask = () => {
        dispatch(onTaskTabChange('addTask'));
        dispatch(handleEditTaskId(id));
    };

    const actions: Action[] = [
        {
            title: 'Edit Task',
            onClick: handleEditTask
        },
        {
            title: 'Task Details',
            onClick: () => dispatch(handleTaskDetailsId(id)),
        },
    ];

    moveButton ? actions.push(moveButton) : null;

    return (
        <div className="task-contain">
            <h4>{title}</h4>
            <span>{formatDate(dueDate, 'dd-MM-yyyy')}</span>
            <p>{description}</p>
            {categories.length ? useMemo(() => <Chip categories={categories} />, [categories]) : null}
            <div className="add-edit">
                <div
                    className="xxx"
                    data-tooltip-id={id}
                    data-tooltip-place='bottom'
                    data-tooltip-content='Task Details'
                    onClick={() => dispatch(handleTaskDetailsId(id))}
                >
                    <Image src={documentInfoIcon.src} alt={documentInfoIcon.alt} width={30} />
                </div>
                <div
                    className="edit"
                    data-tooltip-id={id}
                    data-tooltip-place='bottom'
                    data-tooltip-content='Edit Task'
                    onClick={() => handleEditTask()}
                >
                    <Image src={documentEditIcon.src} alt={documentEditIcon.alt} width={30} />
                </div>

                <Tooltip id={id} style={{ zIndex: 1 }} />
            </div>

            <MenuPopover actions={actions} />
        </div>
    )
};

export default TaskCard;