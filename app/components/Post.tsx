import React from 'react'
import { PostResponse } from '../model/PostModel'
import Image from 'next/image'
import Link from 'next/link'
import DeleteButton from './DeleteButton'
import moment from 'moment'

type PostProps = {
    post: PostResponse
}

function Post({ post }: PostProps) {
    const isEditable = true
    return (
        <div className="my-4 border-b border-b-300 py-8">
            <div className="mb-4">
                {post.author ? (
                    <>
                        Posted by: <span className="font-bold">{post.author}</span> on{" "}
                        {moment(post.datePublished).format("MMM Do YYYY")}
                    </>
                ) : (
                    <>Posted on {moment(post.datePublished).format("MMMM Do YYYY")}</>
                )}
            </div>

            <div className="w-full h-72 relative">
                {post.thumbnail ? (
                    <Image
                        src={post.thumbnail}
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

            {post.category && (
                <Link
                    className="bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block"
                    href={`categories/${post.category}`}
                >
                    {post.category}
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
    )
}

export default Post