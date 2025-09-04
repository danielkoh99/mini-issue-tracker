import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(issues);
}

export async function POST(req: Request) {
  const { title, description } = await req.json();
  const issue = await prisma.issue.create({
    data: { title, description, status: "OPEN" },
  });
  return NextResponse.json(issue, { status: 201 });
}
