'use client'
import React, { useEffect, useState } from 'react'
import { PostResponse } from '../model/PostModel'
import Image from 'next/image'
import Link from 'next/link'
import DeleteButton from './DeleteButton'
import moment from 'moment'
import { Session } from 'next-auth'

type Props = {
    session: Session | null
}

function Post({ session }: Props) {

    const [posts, setPosts] = useState<PostResponse[]>()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define the async fetch function
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/post');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        // Call the fetch function
        fetchCategories();
    }, []);

    // const isEditable = session && session?.user?.email === posts[0].authorEmail;
    const isEditable = true;
    return (
        <div className="">
            {posts && posts.map(post => (
                <div className="my-4 border-b border-b-300 py-8" key={post.id}>
                    <div className="mb-4">
                        {post.author ? (
                            <>
                                Posted by: <span className="font-bold">{post.author.name}</span> on{" "}
                                {moment(post.createdAt).format("MMM Do YYYY")}
                            </>
                        ) : (
                            <>Posted on {moment(post.createdAt).format("MMMM Do YYYY")}</>
                        )}
                    </div>

                    <div className="w-full h-72 relative">
                        {post.imageUrl ? (
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover rounded-md object-center"
                            />
                        ) : (
                            <Image
                                src={"/thumbnail-placeholder.png"}
                                alt={post.title}
                                fill
                                className="object-cover rounded-md object-center"
                            />
                        )}
                    </div>

                    {post.catName && (
                        <Link
                            className="bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block"
                            href={`categories/${post.catName}`}
                        >
                            {post.catName}
                        </Link>
                    )}

                    <h2>{post.title}</h2>
                    <p className="content">{post.content}</p>

                    {post.links && (
                        <div className="my-4 flex flex-col gap-3">
                            {post.links.map((link, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                                        />
                                    </svg>

                                    <Link className="link" href={link}>
                                        {link}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}

                    {isEditable && (
                        <div className="flex gap-3 font-bold py-2 px-4 rounded-md bg-slate-200 w-fit">
                            <Link href={`/edit-post/${post.id}`}>Edit</Link>
                            <DeleteButton id={post.id} />
                        </div>
                    )}
                </div>
            ))}

            {!posts && loading && <p className="text-center text-gray-400 mx-auto flex flex-col items-center justify-center h-screen">Loading.....</p>}
            {!posts && !loading && <p className="text-center text-gray-400 mx-auto">No post to display</p>}

        </div>
    )
}

export default Post