"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetSingleIssue, useUpdateIssue } from "@/app/hooks/useIssues";
import { Status } from "@/app/generated/prisma";
import { NotFound } from "@/components/ui/NotFound";
import { Error } from "@/components/ui/Error";
import { IssueSkeleton } from "../components/SingleIssueSkeleton";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IssueUpdateInput, IssueUpdateSchema } from "@/app/types/issue";
import z from "zod";
import { Button } from "@/components/ui/button";
import { EditableField } from "@/components/ui/EditableField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const IssuePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: issue, error, isLoading } = useGetSingleIssue(id);
  const { mutate } = useUpdateIssue();

  const form = useForm<IssueUpdateInput>({
    resolver: zodResolver(IssueUpdateSchema),
    defaultValues: {
      title: "",
      description: "",
      status: Status.OPEN,
    },
  });
  useEffect(() => {
    if (issue) {
      form.reset({
        title: issue.title,
        description: issue.description,
        status: issue.status,
      });
    }
  }, [issue, form]);
  function onSubmit(values: z.infer<typeof IssueUpdateSchema>) {
    mutate({ id, ...values });
  }
  if (error) return <Error>{error.message}</Error>;
  if (isLoading) return <IssueSkeleton />;
  if (!issue) return <NotFound>Issue not found</NotFound>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex flex-col justify-between items-start mb-4">
        <p className="text-gray-500 underline">
          <Link href="/issues" className="text-cyan-600 hover:text-cyan-800">
            Go back to Issues
          </Link>
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <EditableField value={field.value} name="title" form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <EditableField
                    value={field.value}
                    type="textarea"
                    name="description"
                    form={form}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["OPEN", "IN_PROGRESS", "CLOSED"].map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replaceAll("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button type="submit" variant="default">
              Save
            </Button>
          </div>
        </form>
      </Form>

      <p className="text-gray-500 text-sm mt-4">
        Created: {new Date(issue.createdAt).toLocaleString()} | Updated:{" "}
        {new Date(issue.updatedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default IssuePage;
