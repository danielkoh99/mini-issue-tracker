"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGetSingleIssue, useUpdateIssue } from "@/app/hooks/useIssues";
import { Issue, Status } from "@/app/generated/prisma";
import { NotFound } from "@/components/ui/NotFound";
import { Error } from "@/components/ui/Error";

const IssuePage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: issue, error, isLoading } = useGetSingleIssue(id);
  const { mutate } = useUpdateIssue();
  const [form, setForm] = useState<Partial<Issue>>({
    title: "",
    description: "",
    status: Status.OPEN,
  });

  useEffect(() => {
    if (issue) setForm(issue);
  }, [issue]);
  if (error) return <Error>{error.message}</Error>;
  if (isLoading) return <div>Loading...</div>;
  if (!issue) return <NotFound>Issue not found</NotFound>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ id, ...form });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Issue</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border rounded p-2"
          placeholder="Title"
          required
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border rounded p-2"
          placeholder="Description"
          required
        />
        <div>
          <label className="mr-2 font-semibold">Status:</label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as Issue["status"] })
            }
            className="border rounded p-2"
          >
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => router.push("/issues")}
          >
            Cancel
          </button>
        </div>
      </form>

      <p className="text-gray-500 text-sm mt-4">
        Created: {new Date(issue.createdAt).toLocaleString()} | Updated:{" "}
        {new Date(issue.updatedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default IssuePage;
