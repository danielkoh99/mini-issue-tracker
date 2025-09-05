"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { Issue } from "../generated/prisma";

export type Status = "OPEN" | "IN_PROGRESS" | "CLOSED";

export const useIssues = () => {
  return useQuery<Issue[]>({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await api.get("/issues");
      return res.data;
    },
  });
};
export const useGetSingleIssue = (id: string) => {
  return useQuery<Issue>({
    queryKey: ["issues", id],
    queryFn: async () => {
      const res = await api.get(`/issues/${id}`);
      return res.data;
    },
  });
};
export const useCreateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["issues"],
    mutationFn: async (data: { title: string; description: string }) => {
      const res = await api.post("/issues", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
};

export const useUpdateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Issue>) => {
      const res = await api.put("/issues", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
};

export const useUpdateIssueStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; status: Status }) => {
      const res = await api.patch("/issues", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
};
export const useDeleteIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete("/issues", { data: { id } });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
};
