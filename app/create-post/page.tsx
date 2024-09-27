import React from 'react'
import CreatePostForm from './CreatePostForm'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

async function CreatePost() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/sign-in");
    }
    return (
        <CreatePostForm />
    )
}

export default CreatePost