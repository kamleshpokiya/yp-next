// packages
import { useSelector } from 'react-redux';
import { useState, ChangeEvent } from 'react';
// components
import ApplyFilter from '@/components/ApplyFilter';
import SearchField from '@/components/SearchField';
// sections
import ProjectCard from '@/sections/projects/ProjectCard';
// store
import { RootState } from '@/store/rootReducer';
import { getProjectsByStatus } from '@/store/selectors/projects';


// types
type ProjectsProps = {
    status: string,
};

const Projects = ({ status }: ProjectsProps) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const projects = useSelector((state: RootState) => getProjectsByStatus(state, status));
    const isSearchQuery = searchQuery.trim() !== '';

    const getProjectsBySearchedQuery = () => {
        return projects?.filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    const filteredProjects = isSearchQuery ? getProjectsBySearchedQuery() : projects;

    return (
        <div className="tab-pane fade show active" role="tabpanel" id="v-pills-home" aria-labelledby="v-pills-home-tab">
            <div className="search-btn">
                <SearchField
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    placeholder='Search projects here...'
                />

                <ApplyFilter />
            </div>
            <div className="main-list-box scroll-bar-wrap">
                <div className="scroll-box">
                    {filteredProjects.map((project, key) => (
                        <ProjectCard key={key} project={project} />
                    ))}
                </div>
                <div className="cover-bar" />
            </div>
        </div>
    );
};

export default Projects;
