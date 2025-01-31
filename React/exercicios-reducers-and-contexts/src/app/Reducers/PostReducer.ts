import { Post } from "../types/Post";

export enum PostActionsTypes {
  ADD_POST = "ADD_POST",
  REMOVE_POST = "REMOVE_POST",
}

type addAction = {
  type: PostActionsTypes.ADD_POST;
  payload: {
    title: string;
    body: string;
  };
};
type removeAction = {
  type: PostActionsTypes.REMOVE_POST;
  payload: {
    id: number;
  };
};

export type PostActions = addAction | removeAction;

export const PostReducer = (post: Post[], action: PostActions) => {
  switch (action.type) {
    case PostActionsTypes.ADD_POST:
      return [
        ...post,
        {
          id: post.length + 1,
          title: action.payload.title,
          body: action.payload.body,
        },
      ];
    case PostActionsTypes.REMOVE_POST:
      return post.filter((post) => post.id !== action.payload.id);

    default:
      return post;
  }
};
