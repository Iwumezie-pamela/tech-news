import Link from 'next/link'
import React from 'react'
import { postsData } from '../constant/data'
import Post from '../components/Post'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/sign-in");
    }
    return (
        <div>
            <h1>My Posts</h1>

            {postsData && postsData.length > 0 ? (
                postsData.map((post, index) => (
                    <Post key={index} post={post} />
                ))
            ) : (
                <div className="py-6">
                    No posts created yet.{" "}
                    <Link className="underline" href={"/create-post"}>
                        Create New
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Dashboard