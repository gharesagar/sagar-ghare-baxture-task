import usersData from "../db/users.js";


const findUserById = (userId) => {
  return usersData.find((user) => {
    if (user.id === userId) {
      return user;
    }
  });
};

const isUsernameExists = (username) => {
  return usersData.some((user) => user.username === username);
};

export {
  findUserById,
  isUsernameExists
}