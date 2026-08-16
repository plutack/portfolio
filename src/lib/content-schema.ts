import { z } from "zod";

const nonEmptyString = z.string().trim().min(1);
const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD");
const linkRecord = z.record(z.string().url());

export const projectFrontmatterSchema = z.object({
  name: nonEmptyString,
  date: dateString,
  range: nonEmptyString,
  skills: z.array(nonEmptyString),
  tags: z.array(nonEmptyString),
  images: z.array(z.string().startsWith("/")).min(1),
  shortDescription: nonEmptyString,
  links: linkRecord,
  archived: z.boolean().optional(),
});

export const experienceFrontmatterSchema = z.object({
  title: nonEmptyString,
  date: dateString,
  range: nonEmptyString,
  company: nonEmptyString,
  link: z.union([z.string().url(), z.literal("nil")]),
  skills: z.array(nonEmptyString),
});
