// packages
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/router';
// images
import IMAGES from '@/assets/images';
// types
import { Project } from '@/types';
// utils
import { formatDate } from '@/utils/formatDate';
import { getColor } from '@/utils/colors';
// store
import { addProjectDetailsId, onProjectTabChange, handleEditProjectId } from '@/store/slices/actions';
// components
import Chip from '@/components/Chip';
import MenuPopover from '@/components/MenuPopover';


// types
type ProjectCardProps = {
    project: Project
};

type Action = {
    title: string,
    href?: string,
    onClick?: (e?: any) => void,
};

const ProjectCard = ({ project }: ProjectCardProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { documentInfoIcon, documentEditIcon } = IMAGES;
    const isProjectDetailsPage = router.asPath.includes(`/projects/${router.query.projectId}`);
    const { id, title, dueDate, categories, status, deadline } = project;

    const handleEditProject = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        dispatch(onProjectTabChange('addProject'));
        dispatch(handleEditProjectId(id));
    }

    const onViewProjectDetails = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        dispatch(addProjectDetailsId(id))
    }

    const actions: Action[] = [
        {
            title: 'Edit Project',
            onClick: handleEditProject
        },
        {
            title: 'View Details',
            onClick: onViewProjectDetails
        },
        {
            title: 'Manage Tasks',
            href: `/projects/${id}`
        },
    ];

    return (
        <div
            className={`${isProjectDetailsPage ? 'list-hidden' : 'listing-box'}`}
            onClick={!isProjectDetailsPage ? () => router.push(`/projects/${id}`) : () => { }}
        >
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
                {!isProjectDetailsPage && (
                    <div className="add-edit">
                        <div
                            className="xxx"
                            onClick={onViewProjectDetails}
                            data-tooltip-id='project-card-tooltip'
                            data-tooltip-place='bottom'
                            data-tooltip-content='Project Details'
                        >
                            <Image src={documentInfoIcon.src} alt={documentInfoIcon.alt} width={30} />
                        </div>
                        <div
                            className="edit"
                            onClick={handleEditProject}
                            data-tooltip-id='project-card-tooltip'
                            data-tooltip-place='bottom'
                            data-tooltip-content='Edit Project'
                        >
                            <Image src={documentEditIcon.src} alt={documentEditIcon.alt} width={30} />
                        </div>

                        <Tooltip id='project-card-tooltip' />
                    </div>
                )}

            </div>

            {!isProjectDetailsPage && (
                <MenuPopover actions={actions} />
            )}
        </div>
    );
};

export default ProjectCard;



