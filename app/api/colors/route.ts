import {Logos} from '@/app/page';
import colors from '../../data/colors.json';
import {sql} from '@vercel/postgres';

export async function GET() {
  const {rows} = await sql<Logos>`SELECT * FROM logos`;
  return Response.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const {name, colorSequence, photo} = body;

  await sql<Logos>`INSERT INTO logos (name, colorsequences, photoUrl) VALUES (${name}, ${colorSequence}, ${photo})`;

  return Response.json({
    message: 'Logo agregado',
  });
}
