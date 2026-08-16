import { getAllProjects } from "@/lib/loadmd";
import ProjectsPage from "@/components/projectpage";

export default function Page() {
  return <ProjectsPage projects={getAllProjects()} />;
}
