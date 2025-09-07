import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const token = req.headers.get("Authorization");
  if (token === `Bearer ${process.env.API_TOKEN}`) {
    return NextResponse.json({ message: "Unaothorized" }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
