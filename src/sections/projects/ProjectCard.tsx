import IMAGES from '@/assets/img';
import Image from 'next/image';
import { Project } from '@/types';
import { formatDate } from '@/utils/formatDate';
import { getColor } from '@/utils/colors';
import { useDispatch } from 'react-redux';
import { addProjectDetailsId, onProjectTabChange, handleEditProjectId } from '@/store/reducers/actionsSlice';
import { useMemo } from 'react';
import MenuPopover from './MenuPopover';
import Chip from '@/components/Chip';
import { Tooltip } from 'react-tooltip';

type ProjectCardProps = {
    project: Project
};

const ProjectCard = ({ project }: ProjectCardProps) => {
    const { documentInfoIcon, documentEditIcon } = IMAGES;
    const dispatch = useDispatch();
    const { id, title, dueDate, categories, status, deadline } = project;

    const handleEditProject = () => {
        dispatch(onProjectTabChange('addProject'));
        dispatch(handleEditProjectId(id));
    }

    return (
        <div className="listing-box">
            <div className="uper-part">
                <div className="title">
                    <h3>{title}</h3>
                    <div className='badge'>
                        <span
                            className='badgeStatus'
                            style={{
                                background: getColor(status === 'Pending Allocation' ? 'pending' : status === 'In Progress' ? 'information' : 'success')
                            }}
                        />
                        <h6 className="badgeContent">{status}</h6>
                    </div>
                    <div className="note-box">
                        {deadline !== 'Deadline' && (
                            <p>{deadline}</p>
                        )}
                    </div>
                </div>
                {categories.length ? useMemo(() => <Chip categories={categories} />, [categories]) : null}
            </div>
            <div className="lower-part">
                <div className="date-time">
                    <p>{formatDate(dueDate, 'dd-MM-yyyy hh:mm a')}</p>
                </div>
                <div className="add-edit">
                    <div
                        className="xxx"
                        onClick={() => dispatch(addProjectDetailsId(id))}
                        data-tooltip-id='project-card-tooltip'
                        data-tooltip-place='bottom'
                        data-tooltip-content='Project Details'
                    >
                        <Image src={documentInfoIcon.src} alt={documentInfoIcon.alt} width={30} />
                    </div>
                    <div
                        className="edit"
                        onClick={() => handleEditProject()}
                        data-tooltip-id='project-card-tooltip'
                        data-tooltip-place='bottom'
                        data-tooltip-content='Edit Project'
                    >
                        <Image src={documentEditIcon.src} alt={documentEditIcon.alt} width={30} />
                    </div>

                    <Tooltip id='project-card-tooltip' />
                </div>
            </div>

            <MenuPopover id={id} />
        </div>
    );
};

export default ProjectCard;



