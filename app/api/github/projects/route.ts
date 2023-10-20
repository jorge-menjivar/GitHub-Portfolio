import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { fetchProjects } from '@/helpers/projects';

export const dynamic = 'force-dynamic';

export async function GET() {
  revalidatePath('/api/github/projects');
  const projects = await fetchProjects();

  return NextResponse.json({ projects });
}
