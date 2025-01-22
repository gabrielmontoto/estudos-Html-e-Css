import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";

export const PostList = () => {
  const postCtx = useContext(PostContext);

  return (
    <div>
      {postCtx?.posts.map((post) => (
        <div key={post.id} className="border-b border-gray-400 p-3">
          <div className="text-xl font-bold mb-2">{post.title}</div>
          <div className="text-sm">{post.body}</div>
        </div>
      ))}
    </div>
  );
};
