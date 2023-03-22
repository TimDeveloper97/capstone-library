import * as api from "../apis/post";

export const addPost = (data) => async (dispatch) => {
    const response = await api.addPost(data);
    console.log("run add post");
    console.log(response);
    
}