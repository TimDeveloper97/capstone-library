const curUser = JSON.parse(window.localStorage.getItem("user"));

const user = (state = curUser, action) => {
  switch (action.type) {
    case "UPDATE_USER": {
      return action.payload;
    }
    default:
      return state;
  }
};

export default user;
