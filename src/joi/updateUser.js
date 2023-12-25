import Joi from "joi";
import { badRequestResponse } from "../utils/responseHandler.js";

const updateUserSchema = Joi.object({
  userId: Joi.string()
    .guid({ version: ["uuidv4", "uuidv5"] })
    .required(),
  username: Joi.string().min(3).max(30).required(),
  age: Joi.number().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
});

const updateUserValidation = async (req, res, next) => {
  try {
    await updateUserSchema.validateAsync({
      userId: req.params.userId,
      username: req.body.username,
      age: req.body.age,
      hobbies: req.body.hobbies,
    });

    next();
  } catch (err) {
    badRequestResponse(res, err.message);
  }
};

export default updateUserValidation;
