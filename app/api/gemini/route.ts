export async function POST(request: Request) {
  const { prompt } = await request.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return Response.json(data);
}