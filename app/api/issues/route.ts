import { Status } from "@/app/generated/prisma";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const issues = await prisma.issue.findMany({
    // Order by desc to get newest on top
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(issues);
}

export async function POST(req: Request) {
  const { title, description } = await req.json();
  const issue = await prisma.issue.create({
    data: { title, description, status: Status.OPEN },
  });
  return NextResponse.json(issue, { status: 201 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const issue = await prisma.issue.delete({ where: { id } });
  return NextResponse.json(issue);
}

export async function PUT(req: Request) {
  const { id, title, description, status } = await req.json();
  const issue = await prisma.issue.update({
    where: { id },
    data: { title, description, status },
  });
  return NextResponse.json(issue);
}
