/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaClient } from "../app/generated/prisma/client";

export const prisma = new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  // @ts-ignore
  globalThis.prisma = globalThis.prisma || prisma;
}

export default prisma;
