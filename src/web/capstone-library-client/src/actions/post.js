import * as api from "../apis/post";

export const addPost = (data) => async (dispatch) => {
  const response = await api.addPost(data);
  return response.data;
};

export const getPosts = () => async (dispatch) => {
  const { data } = await api.getPosts();
  dispatch({ type: "GET_POSTS", payload: data.value ? data.value : [] });
};
