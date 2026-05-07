export async function GET() {
  const res = await fetch(
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/players`,
  { cache: "no-store" }
  );

  const data = await res.json();

  return Response.json(data);
}