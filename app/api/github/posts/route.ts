import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { fetchPosts } from '@/helpers/posts';

export const dynamic = 'force-dynamic';

export async function GET() {
  revalidatePath('/api/github/posts');
  const posts = await fetchPosts();

  return NextResponse.json({ posts });
}
