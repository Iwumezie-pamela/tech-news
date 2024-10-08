import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PostResponse } from "@/app/model/PostModel";
import EditPostForm from "@/app/components/EditPostForm";

const getPost = async (id: string): Promise<PostResponse | null> => {
    try {
        const res = await fetch(`http://localhost:3000/api/post/${id}`, {
            cache: "no-store",
        });

        if (res.ok) {
            const post = await res.json();
            return post;
        }
    } catch (error) {
        console.log(error);
    }

    return null;
};

export default async function EditPost({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/sign-in");
    }

    const id = params.id;
    const post = await getPost(id);

    return <>{post ? <EditPostForm post={post} /> : <div>Invalid Post</div>}</>;
}