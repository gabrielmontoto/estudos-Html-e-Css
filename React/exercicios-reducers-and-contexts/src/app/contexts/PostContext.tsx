import { createContext, useState } from "react";
import { Post } from "../types/Post";

type PostContextType = {
  posts: Post[];
  addPost: (tittle: string, body: string) => void;
};
export const PostContext = createContext<PostContextType | null>(null);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  function addPost(tittle: string, body: string) {
    setPosts([
      ...posts,
      {
        id: posts.length + 1,
        title: tittle,
        body: body,
      },
    ]);
  }

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}
