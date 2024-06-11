import {Logos} from '@/app/page';

import {sql} from '@vercel/postgres';
import {utapi} from '../uploadthing/core';
import {NextApiRequest} from 'next';

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

export async function DELETE(request: Request) {
  const {searchParams} = new URL(request.url);
  const id = searchParams.get('id');

  const response = await sql<Logos>`SELECT * FROM logos WHERE id = ${id}`;

  const log = response.rows[0];

  if (!log) return Response.json({message: 'Logo no encontrado'});

  console.log('log', log);
  const photoKey = log.photourl.split('/').pop();

  console.log('photoKey', photoKey);
  if (photoKey) {
    await utapi.deleteFiles(photoKey);
    console.log('photo deleted');
  }

  await sql<Logos>`DELETE FROM logos WHERE id = ${id}`;

  console.log('Logo eliminado');
  return Response.json({message: 'Logo eliminado'});
}
