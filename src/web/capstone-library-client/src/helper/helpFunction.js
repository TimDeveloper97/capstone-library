 const getImgUrl = (img) => {
    return "http://192.168.137.206:8888" + img;
}

const isAdmin = (user) => {
    return user.roles[0] === "ROLE_ADMIN";
}

export {getImgUrl, isAdmin}