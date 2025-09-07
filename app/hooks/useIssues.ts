"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { Issue, Status } from "../generated/prisma";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useIssues = () => {
  return useQuery<Issue[]>({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await api.get("/issues");
      return res.data;
    },
  });
};
export const useGetSingleIssue = (
  id: string,
  options: { enabled?: boolean }
) => {
  return useQuery<Issue>({
    enabled: options.enabled,
    retry: false,
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
    onError: (error: { error: string }) => {
      toast.error(error.error);
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
    onError: (error: { error: string }) => {
      toast.error(error.error);
    },
    onSuccess: (data: { message: string }) => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      toast.success(data.message);
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
    onError: (error: { error: string }) => {
      toast.error(error.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
};
export const useDeleteIssue = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete("/issues", { data: { id } });
      return res.data;
    },
    onError: (error: { error: string }) => {
      toast.error(error.error);
    },
    onSuccess: (_data, id) => {
      router.push("/issues");
      queryClient.removeQueries({ queryKey: ["issues", id], exact: true });
      queryClient.invalidateQueries({ queryKey: ["issues"] });

      toast.success("Issue deleted successfully");
    },
  });
};
