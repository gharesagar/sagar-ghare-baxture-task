import Joi from "joi";
import { badRequestResponse } from "../utils/responseHandler.js";

const deleteUserSchema = Joi.object({
  userId: Joi.string()
    .guid({ version: ["uuidv4", "uuidv5"] })
    .required(),
});

const deleteUserValidation = async (req, res, next) => {
  try {
    await deleteUserSchema.validateAsync({
      userId: req.params.userId
    });

    next();
  } catch (err) {
    badRequestResponse(res, err.message);
  }
};


export default deleteUserValidation;