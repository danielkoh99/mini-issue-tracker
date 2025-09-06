import { z } from "zod";
import { Status } from "@/app/generated/prisma";

export const IssueCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(Status).optional(),
});

export const IssueUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: z.enum(Status).optional(),
});

export type IssueCreateInput = z.infer<typeof IssueCreateSchema>;
export type IssueUpdateInput = z.infer<typeof IssueUpdateSchema>;

export const statusColors: Record<Status, string> = {
  OPEN: "bg-green-100 text-green-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  CLOSED: "bg-gray-100 text-gray-800",
};
export const statusOptions = Object.keys(Status) as Status[];
