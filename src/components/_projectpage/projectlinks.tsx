import Image from "next/image";
import { ProjectLink } from "@/types";

const iconForLink = (name: string) => {
  const iconNames: Record<string, string> = {
    github: "live",
    live: "github",
    "api-link": "github",
  };

  return iconNames[name] ?? name;
};

const svgSource = (name: string) => `/svgs/${iconForLink(name)}.svg`;

export default function ProjectLinks({
  links,
  classname,
}: {
  links: ProjectLink[];
  classname: string;
}) {
  return (
    <div className={classname}>
      {links.map(({ name, url }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} link`}
        >
          <Image
            src={svgSource(name)}
            alt=""
            width={16}
            height={16}
          />
        </a>
      ))}
    </div>
  );
}
