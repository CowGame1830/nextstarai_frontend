import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { size: string[] } }) {
  const [width = '150', height = '150'] = params.size || [];
  
  // Simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
      <circle cx="50%" cy="35%" r="15%" fill="#9ca3af"/>
      <ellipse cx="50%" cy="65%" rx="25%" ry="15%" fill="#9ca3af"/>
      <text x="50%" y="85%" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="12">Player</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}