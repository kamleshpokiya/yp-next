import ApplyFilter from '@/components/ApplyFilter';
import SearchBox from '@/components/SearchBox';
import ProjectCard from '@/sections/projects/ProjectCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { getProjectsByStatus } from '@/store/actions/projects';
import { useState, useEffect } from 'react';
import { Project } from '@/types';

type ProjectsProps = {
    status: string,
};

const Projects = ({ status }: ProjectsProps) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = useSelector((state: RootState) => getProjectsByStatus(state, status));

    const handleSelectChange = (selected: any) => {
        setSelectedProject(selected);
    };

    useEffect(() => {
        setSelectedProject(null);
    }, [status]);

    return (
        <div className="tab-pane fade show active" role="tabpanel" id="v-pills-home" aria-labelledby="v-pills-home-tab">
            <div className="search-btn">
                <SearchBox
                    options={projects}
                    value={selectedProject}
                    onChange={handleSelectChange}
                    getOptionLabel={(option: Project) => option.title}
                />

                <ApplyFilter />
            </div>
            <div className="main-list-box scroll-bar-wrap">
                <div className="scroll-box">
                    {selectedProject ? [selectedProject].map((project, key) => (
                        <ProjectCard key={key} project={project} />
                    )) : projects.map((project, key) => (
                        <ProjectCard key={key} project={project} />
                    ))}
                </div>
                <div className="cover-bar" />
            </div>
        </div>
    );
};

export default Projects;
