export function middleware(req: Request) {
  const token = req.headers.get("Authorization");
  if (token !== `Bearer ${process.env.API_TOKEN}`) {
    return new Response("Unauthorized", { status: 401 });
  }
}

export const config = {
  matcher: "/api/:path*",
};
