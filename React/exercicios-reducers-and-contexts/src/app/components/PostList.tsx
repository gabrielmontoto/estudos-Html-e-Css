import { usePosts } from "../contexts/PostContext";
import { PostActionsTypes } from "../Reducers/PostReducer";

export const PostList = () => {
  const postCtx = usePosts();

  const handleRemoveButton = (id: number) => {
    postCtx?.dispatch({ type: PostActionsTypes.REMOVE_POST, payload: { id } });
  };

  return (
    <div>
      {postCtx?.posts.map((post) => (
        <div key={post.id} className="border-b border-gray-400 p-3">
          <div className="text-xl font-bold mb-2">{post.title}</div>
          <div className="text-sm">{post.body}</div>
          <button onClick={() => handleRemoveButton(post.id)}>
            [ remover ]
          </button>
        </div>
      ))}
    </div>
  );
};
