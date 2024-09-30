import { getServerSession } from "next-auth";
import CategoriesLists from "./components/CategoriesLists";
import Post from "./components/Post";
import { authOptions } from "./api/auth/[...nextauth]/route";


export default async function Home() {
    const session = await getServerSession(authOptions);
    return (
        <>
            <CategoriesLists />
            <Post session={session}/>

        </>
    );
}
