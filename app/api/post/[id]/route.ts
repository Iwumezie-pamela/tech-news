import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return new Response(JSON.stringify({ error: 'Post not found.' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!post) {
    return new Response(JSON.stringify({ error: 'Post not found.' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const { title, content, links, selectedCategory, imageUrl, publicId } =
      await request.json();

    const authorEmail = 'iwumeziep@gmail.com';
    if (!params.id) {
      return new Response(JSON.stringify({ error: 'Post not found.' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const updatePost = await prisma.post.update({
      where: { id: params.id },
      data: {
        title,
        content,
        links,
        catName: selectedCategory,
        authorEmail,
        imageUrl,
        publicId,
      },
    });

    return new Response(JSON.stringify(updatePost), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Update Post Error:', error);
    return new Response(
      JSON.stringify({
        error: 'An error occurred while updating the post.',
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    await prisma.post.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify({ message: 'Post deleted.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Delete Post Error:', error);
    return new Response(
      JSON.stringify({
        error: 'An error occurred while deleting the post.',
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
