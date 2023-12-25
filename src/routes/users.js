import express from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../controller/users.js";
import createUserValidation  from "../joi/createUser.js";
import getUserValidation from "../joi/getUser.js";
import updateUserValidation from "../joi/updateUser.js";
import deleteUserValidation from "../joi/deleteUser.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUserValidation, createUser);
router.get("/:userId", getUserValidation, getUser);
router.put("/:userId", updateUserValidation, updateUser);
router.delete("/:userId", deleteUserValidation, deleteUser)

export default router;
