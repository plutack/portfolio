import Navbar from "@/components/navbar";
import { getAllExperiences, getAllProjects } from "@/lib/loadmd";

// Home Page JSX
import HomePage from "@/components/homepage";
import ExperienceArray from "@/components/_homepage/expviewer";
import About from "@/components/_homepage/about";
import Skills from "@/components/_homepage/skills";
import Contact from "@/components/_homepage/contact";
import ProjectsSection from "@/components/_homepage/projects";
import Socials from "@/components/_homepage/socials";

import { SocialLinks } from "@/types";
import scJson from "@/../_content/socials.json";
import Intro from "@/components/_homepage/intro";

export default function Home() {
  const exparr = getAllExperiences();
  const projects = getAllProjects();
  const sociallinks: SocialLinks[] = scJson;
  return (
    <main>
      <Navbar to_path="/projects" name="Projects" />
      <HomePage
        sections={{
          home: <Intro />,
          projects: <ProjectsSection projects={projects} />,
          about: <About />,
          skills: <Skills />,
          experience: <ExperienceArray exparr={exparr} />,
          contact: <Contact />,
        }}
      />
      <Socials socials={sociallinks} />
    </main>
  );
}
