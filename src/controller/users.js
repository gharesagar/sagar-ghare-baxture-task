"use strict";

import usersData from "../db/users.js";
import { findUserById, isUsernameExists } from "../utils/common.js";
import { responseMessages } from "../utils/constants.js";
import * as responseHandler from "../utils/responseHandler.js";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

const {
  successResponse,
  createdResponse,
  noContentResponse,
  notFoundResponse,
  internalServerErrorResponse,
  dataAlreadyExistsResponse,
} = responseHandler;

const USERS_DATA_FETCH = responseMessages.USERS_DATA_FETCH;
const NO_USERS = responseMessages.NO_USERS;
const USER_CREATED = responseMessages.USER_CREATED;
const USER_ALREADY_EXISTS = responseMessages.USER_ALREADY_EXISTS;
const USER_DATA_FETCH = responseMessages.USER_DATA_FETCH;
const NO_USER = responseMessages.NO_USER;
const USER_UPDATED_SUCCESSFULLY = responseMessages.USER_UPDATED_SUCCESSFULLY;
const USER_DELETED_SUCCESSFULLY = responseMessages.USER_DELETED_SUCCESSFULLY;

const createUser = (req, res) => {
  try {
    const { username, age, hobbies } = req.body;

    if (isUsernameExists(username)) {
      dataAlreadyExistsResponse(res, USER_ALREADY_EXISTS);
      return;
    }

    const obj = { id: uuidv4(), username, age, hobbies, isDeleted: false };
    usersData.push(obj);
    createdResponse(res, USER_CREATED, obj);
  } catch (error) {
    internalServerErrorResponse(res, error.message);
  }
};

const updateUser = (req, res) => {
  try {
    const { userId } = req.params;
    const { username, age, hobbies } = req.body;

    // First check exists or not
    const foundUser = findUserById(userId);

    if (!foundUser) {
      notFoundResponse(res, NO_USER);
    } else {
      if (isUsernameExists(username)) {
        dataAlreadyExistsResponse(res, USER_ALREADY_EXISTS);
        return;
      }

      foundUser.username = username;
      foundUser.age = age;
      foundUser.hobbies = hobbies;

      successResponse(res, USER_UPDATED_SUCCESSFULLY, foundUser);
    }
  } catch (error) {
    internalServerErrorResponse(res, error.message);
  }
};

const getAllUsers = (req, res) => {
  try {
    let response = {};

    const modifiedData = usersData.filter((user) => !user.isDeleted);
    // .map(({ id, username, age, hobbies }) => ({
    //   id,
    //   username,
    //   age,
    //   hobbies,
    // }));

    if (modifiedData && modifiedData.length > 0) {
      response = { message: USERS_DATA_FETCH, data: modifiedData };
    } else {
      response = { message: NO_USERS, data: modifiedData };
    }

    successResponse(res, response.message, response.data);
  } catch (error) {
    internalServerErrorResponse(res, error.message);
  }
};

const getUser = (req, res) => {
  try {
    const userId = req.params.userId;

    const foundUser = findUserById(userId);

    if (foundUser && !foundUser.isDeleted) {
      successResponse(res, USER_DATA_FETCH, foundUser);
    } else {
      notFoundResponse(res, NO_USER);
    }
  } catch (error) {
    internalServerErrorResponse(res, error.message);
  }
};

const deleteUser = (req, res) => {
  try {
    const userId = req.params.userId;

    const foundUser = findUserById(userId);

    if (foundUser) {
      foundUser.isDeleted = true;

      noContentResponse(res, USER_DELETED_SUCCESSFULLY);
    } else {
      notFoundResponse(res, NO_USER);
    }
  } catch (error) {
    internalServerErrorResponse(res, error.message);
  }
};

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
