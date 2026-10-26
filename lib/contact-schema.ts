import { z } from "zod";
import { site } from "@/content/site";
const { validation, budgets, services } = site.contact;
export const contactSchema = z.object({
  name: z.string().trim().min(2, validation.name).max(80, validation.name),
  email: z.email(validation.email).trim().max(254, validation.email),
  company: z.string().trim().max(120, validation.company),
  budget: z.string().refine((value) => budgets.includes(value), validation.budget),
  service: z.string().refine((value) => services.includes(value), validation.service),
  message: z.string().trim().min(20, validation.message).max(5000, validation.message),
  website: z.string().max(200).optional(),
});
export type ContactValues = z.infer<typeof contactSchema>;
