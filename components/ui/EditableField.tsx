import { useState } from "react";
import { useForm } from "react-hook-form";
import { Issue } from "@/app/generated/prisma";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type IssueForm = Partial<Issue>;

interface EditableFieldProps {
  value?: string;
  name: keyof IssueForm;
  form: ReturnType<typeof useForm<IssueForm>>;
  type?: "input" | "textarea";
}

export const EditableField = ({
  value,
  name,
  form,
  type = "input",
}: EditableFieldProps) => {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <>
      {type === "textarea" ? (
        <Textarea
          {...form.register(name)}
          onBlur={() => setEditing(false)}
          autoFocus
        />
      ) : (
        <Input
          {...form.register(name)}
          onBlur={() => setEditing(false)}
          autoFocus
        />
      )}
    </>
  ) : (
    <div
      className="items-center justify-start flex cursor-text border rounded-sm border-gray-200 hover:bg-gray-50 transition-all p-2 min-h-10"
      onClick={() => setEditing(true)}
    >
      {value || <span className="text-gray-400">Click to edit</span>}
    </div>
  );
};
