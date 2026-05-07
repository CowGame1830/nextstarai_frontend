export async function GET() {
  const res = await fetch(
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/players-3p`,
  { cache: "no-store" }
  );

  const data = await res.json();

  return Response.json(data);
}