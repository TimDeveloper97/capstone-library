import * as api from "../apis/order";

export const orderBook = (post) => async (dispatch) => {
    const response = await api.orderBook(post);
    console.log(response);
}