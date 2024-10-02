import { DelayedSuspense } from "@/components/delayedsus";
import ProjectsPage from "@/components/projectpage";
import { getAllProjects } from "@/lib/loadmd";



export default function Page() {
  const projects = getAllProjects();
  
  const uniqueTags = new Set<string>();
  projects.forEach(project => {
    project.tags = project.tags.map(tag => tag.toUpperCase());
    project.tags.forEach(tag => uniqueTags.add(tag));
  });


  return <DelayedSuspense>
    <ProjectsPage
      projects={projects}
      uniqueTags={uniqueTags}
    >
    </ProjectsPage>

  </DelayedSuspense>
  
  


}
