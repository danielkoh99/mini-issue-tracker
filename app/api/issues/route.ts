import { Status } from "@/app/generated/prisma";
import { IssueCreateSchema } from "@/app/types/issue";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const issues = await prisma.issue.findMany({
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    });
    return NextResponse.json(issues);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch issues", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = IssueCreateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.message },
        { status: 400 }
      );
    }

    const { title, description, status } = parsed.data;
    const issue = await prisma.issue.create({
      data: { title, description, status },
    });

    return NextResponse.json(issue, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create issue", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing issue id" }, { status: 400 });
    }

    const issue = await prisma.issue.delete({ where: { id } });
    return NextResponse.json(issue);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete issue", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, description, status } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing issue id" }, { status: 400 });
    }

    const issue = await prisma.issue.update({
      where: { id },
      data: { title, description, status },
    });

    return NextResponse.json({ message: "Issue updated successfully", issue });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update issue", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing issue id" }, { status: 400 });
    }

    const issue = await prisma.issue.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ message: "Issue updated successfully", issue });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update issue status", details: String(error) },
      { status: 500 }
    );
  }
}
