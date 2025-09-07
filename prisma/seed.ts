import prisma from "./client";
import { Status } from "../app/generated/prisma/client";

const issues = [
  {
    title: "Cannot login",
    description: "User reports 401 on login.",
    status: Status.OPEN,
  },
  {
    title: "Slow dashboard",
    description: "Graphs take 5s to load.",
    status: Status.IN_PROGRESS,
  },
  {
    title: "Typo on homepage",
    description: "‘Welcom’ should be ‘Welcome’.",
    status: Status.CLOSED,
  },
  {
    title: "Email notifications not sent",
    description: "Users do not receive password reset emails.",
    status: Status.OPEN,
  },
  {
    title: "Mobile layout broken",
    description: "On iPhone Safari the navbar overlaps the content.",
    status: Status.IN_PROGRESS,
  },
  {
    title: "Dark mode colors incorrect",
    description: "Buttons are unreadable in dark theme.",
    status: Status.OPEN,
  },
  {
    title: "Report export timeout",
    description: "Exporting large reports fails after 30s.",
    status: Status.OPEN,
  },
  {
    title: "User avatar not updating",
    description: "Profile picture stays cached after upload.",
    status: Status.CLOSED,
  },
  {
    title: "Search results inconsistent",
    description: "Sometimes returns outdated data after creating a new item.",
    status: Status.IN_PROGRESS,
  },
  {
    title: "Settings page crashes",
    description: "Visiting /settings throws a 500 error.",
    status: Status.OPEN,
  },
];
async function main() {
  await prisma.issue.deleteMany();
  await prisma.issue.createMany({
    data: issues,
  });
}

main().finally(() => prisma.$disconnect());
