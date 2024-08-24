import {Logos} from '@/app/page';

import {sql} from '@vercel/postgres';
import {utapi} from '../uploadthing/core';

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const limit = searchParams.get('limit') || '5';
  const offset = searchParams.get('offset') || '0';
  const search = searchParams.get('search') || '';

  const logsQuery = sql<Logos>`SELECT id,UPPER(name) as name, colorsequences, photourl FROM logos WHERE name LIKE ${
    '%' + search.toUpperCase() + '%'
  } LIMIT ${limit} OFFSET ${offset}`;

  const countQuery = sql<{
    count: number;
  }>`SELECT COUNT(*) as count FROM logos`;

  const [logsQueyResult, countQueryResult] = await Promise.all([
    logsQuery,
    countQuery,
  ]);

  const hasMore = countQueryResult.rows[0].count > +offset + +limit;

  return Response.json({
    rows: logsQueyResult.rows ?? [],
    count: countQueryResult.rows[0].count,
    hasMore,
  });
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

  const photoKey = log.photourl.split('/').pop();

  if (photoKey) {
    await utapi.deleteFiles(photoKey);
  }

  await sql<Logos>`DELETE FROM logos WHERE id = ${id}`;

  return Response.json({message: 'Logo eliminado'});
}
