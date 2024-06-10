import colors from '../../data/colors.json';

export async function GET() {
  return Response.json(colors);
}
