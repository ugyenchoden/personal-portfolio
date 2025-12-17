type Project = {
  name: string;
  tech: string;
};

const projects: Project[] = [
  { name: "Mac Portfolio", tech: "React, TypeScript" },
  { name: "Interactive Map", tech: "React, Maps API" },
  { name: "Rails API", tech: "Rails 8, PostgreSQL" },
];

const ProjectsFolder = () => {
  return (
    <div className="app-content">
      <h2>Projects</h2>

      <div className="folder-grid">
        {projects.map((project) => (
          <div key={project.name} className="file">
            <span className="file-icon">📄</span>
            <p>{project.name}</p>
            <small>{project.tech}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsFolder;
