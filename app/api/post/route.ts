import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function POST(request: Request) {
  try {
    const { title, content, links, selectedCategory, imageUrl, publicId } =
      await request.json();
    const authorEmail = 'iwumeziep@gmail.com';

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 500 }
      );
    }

    const createPost = await prisma.post.create({
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

    return NextResponse.json(createPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return new Response(JSON.stringify({ error: 'Failed to create post' }), {
      status: 500, // Internal Server Error
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong');
  }
}
