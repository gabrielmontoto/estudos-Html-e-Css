import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Post } from "../types/Post";
import {
  PostActions,
  PostActionsTypes,
  PostReducer,
} from "../Reducers/PostReducer";

const LOCAL_STORAGE_KEY = "postsContexts";

type PostContextType = {
  posts: Post[];
  dispatch: Dispatch<PostActions>;
};
export const PostContext = createContext<PostContextType | null>(null);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, dispatch] = useReducer(
    PostReducer,
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]") as Post[]
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  return (
    <PostContext.Provider value={{ posts, dispatch }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => {
  return useContext(PostContext);
};
