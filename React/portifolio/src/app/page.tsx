import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";

const projects = [
  {
    title: "Jogo 1",
    description: "Um jogo incrível feito com Unity.",
    imageUrl: "/images/example.jpg",
    projectUrl: "#",
  },
  {
    title: "Jogo 2",
    description: "Um jogo de plataforma 2D.",
    imageUrl: "https://via.placeholder.com/300",
    projectUrl: "#",
  },
];

export default function Home() {
  return (
    <div className="bg-retro-blue min-h-screen p-8">
      <Header />
      <h1 className="text-4xl font-comic-sans text-retro-pink text-center mb-8">
        Meu Portfólio Retrô
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}
