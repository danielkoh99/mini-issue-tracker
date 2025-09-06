import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(_: Request, context: { params: { id: string } }) {
  const { id } = await context.params;

  try {
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }
    return NextResponse.json(issue);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch issue", details: String(error) },
      { status: 500 }
    );
  }
}
