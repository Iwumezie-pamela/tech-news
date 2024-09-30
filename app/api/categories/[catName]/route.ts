import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { catName: string } }
) {
  try {
    const catName = params.catName;
    const posts = await prisma.category.findUnique({
      where: { catName },
      include: {
        posts: { include: { author: true }, orderBy: { createdAt: 'desc' } },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Could not fetch post' });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { catName: string } }
) {
  try {
    await prisma.category.delete({
      where: { catName: params.catName },
    });

    return new Response(JSON.stringify({ message: 'Category deleted.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Delete Category Error:', error);
    return new Response(
      JSON.stringify({
        error: 'An error occurred while deleting the category.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
