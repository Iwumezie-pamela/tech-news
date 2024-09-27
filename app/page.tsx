import CategoriesLists from "./components/CategoriesLists";
import Post from "./components/Post";
import { postsData } from "./constant/data";


export default function Home() {
    return (
        <>
            <CategoriesLists />
            {postsData && postsData.length > 0 ? (
                postsData.map((post, index) => (
                    <Post key={index} post={post}/>
                ))
            )
                : (
                    <div className="">No post to display</div >
                )
            }
        </>
    );
}
