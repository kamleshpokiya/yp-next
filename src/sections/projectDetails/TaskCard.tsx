import Chip from "@/components/Chip";
import { Task } from "@/types";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { useMemo } from "react";
import { Tooltip } from "react-tooltip";
import IMAGES from "@/assets/img";

const TaskCard = ({
    title,
    description,
    createdDate,
    dueDate,
    categories,
}: Task) => {

    const { documentInfoIcon, documentEditIcon } = IMAGES;

    return (
        <div className="task-contain">
            <h4>{title}</h4>
            <span>{formatDate(dueDate, 'dd-MM-yyyy')}</span>
            <p>{description}</p>
            {categories.length ? useMemo(() => <Chip categories={categories} />, [categories]) : null}
            <div className="add-edit">
                <div
                    className="xxx"
                    data-tooltip-id='project-card-tooltip'
                    data-tooltip-place='bottom'
                    data-tooltip-content='Project Details'
                >
                    <Image src={documentInfoIcon.src} alt={documentInfoIcon.alt} width={30} />
                </div>
                <div
                    className="edit"
                    data-tooltip-id='project-card-tooltip'
                    data-tooltip-place='bottom'
                    data-tooltip-content='Edit Project'
                >
                    <Image src={documentEditIcon.src} alt={documentEditIcon.alt} width={30} />
                </div>

                <Tooltip id='project-card-tooltip' />
            </div>

            <div className="project-doct">
                <span />
            </div>
        </div>
    )
};

export default TaskCard;