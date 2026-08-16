import { Project, Experience } from "@/types";
import {
  experienceFrontmatterSchema,
  projectFrontmatterSchema,
} from "@/lib/content-schema";
import fs from "fs";
import { extname, join, parse } from "path";
import matter from "gray-matter";
import { z } from "zod";

function listMarkdownFiles(contentDirectory: string) {
  return fs
    .readdirSync(contentDirectory)
    .filter((file) => extname(file) === ".md")
    .sort();
}

function readMarkdownFile(fileName: string, contentDirectory: string) {
  const fullPath = join(contentDirectory, fileName);
  return matter(fs.readFileSync(fullPath, "utf8"));
}

function formatValidationError(fileName: string, error: z.ZodError) {
  const issues = error.issues
    .map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`)
    .join("; ");

  return new Error(`Invalid content in ${fileName}: ${issues}`);
}

function extractProject(fileName: string, contentDirectory: string): Project {
  const { data, content } = readMarkdownFile(fileName, contentDirectory);
  const result = projectFrontmatterSchema.safeParse(data);

  if (!result.success) {
    throw formatValidationError(fileName, result.error);
  }

  for (const image of result.data.images) {
    const assetPath = join(process.cwd(), "public", image.replace(/^\//, ""));
    if (!fs.existsSync(assetPath)) {
      throw new Error(`Missing project image referenced by ${fileName}: ${image}`);
    }
  }

  return {
    ...result.data,
    slug: parse(fileName).name,
    tags: result.data.tags.map((tag) => tag.toUpperCase()),
    links: Object.entries(result.data.links).map(([name, url]) => ({ name, url })),
    content,
  };
}

function extractExperience(
  fileName: string,
  contentDirectory: string,
): Experience {
  const { data, content } = readMarkdownFile(fileName, contentDirectory);
  const result = experienceFrontmatterSchema.safeParse(data);

  if (!result.success) {
    throw formatValidationError(fileName, result.error);
  }

  return { ...result.data, content };
}

export function getAllProjects(): Project[] {
  const contentDirectory = join(process.cwd(), "_content", "projects");

  return listMarkdownFiles(contentDirectory)
    .map((file) => extractProject(file, contentDirectory))
    .sort((first, second) => second.date.localeCompare(first.date));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getAllExperiences(): Experience[] {
  const contentDirectory = join(process.cwd(), "_content", "exp");

  return listMarkdownFiles(contentDirectory)
    .map((file) => extractExperience(file, contentDirectory))
    .sort((first, second) => second.date.localeCompare(first.date));
}
