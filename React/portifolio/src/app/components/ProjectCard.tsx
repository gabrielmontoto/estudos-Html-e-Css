import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  projectUrl,
}) => {
  return (
    <div className="border-2 border-retro-pink rounded-lg p-4 m-4 bg-retro-purple text-center shadow-lg hover:shadow-retro-blue transition-shadow">
      <img src={imageUrl} alt={title} className="w-full rounded-lg mb-4" />
      <h3 className="text-2xl font-comic-sans text-retro-blue">{title}</h3>
      <p className="text-retro-green font-arial">{description}</p>
      <a
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 px-6 py-2 bg-retro-green text-black rounded-lg hover:bg-retro-pink hover:text-white transition-colors"
      >
        Ver Projeto
      </a>
    </div>
  );
};

export default ProjectCard;
