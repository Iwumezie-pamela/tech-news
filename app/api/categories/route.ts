import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';


interface Body {
  catName: string;
}

export async function POST(request: Request) {
  try {
    const body: Body = await request.json();

    const createCategory = await prisma.category.create({
      data: body,
    });

    return NextResponse.json(createCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create category' }),
      {
        status: 500, // Internal Server Error
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}


export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong');
  }
}
