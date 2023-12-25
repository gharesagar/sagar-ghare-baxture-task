import Joi from "joi";
import { badRequestResponse } from "../utils/responseHandler.js";

const getUserSchema = Joi.object({
  userId: Joi.string()
    .guid({ version: ["uuidv4", "uuidv5"] })
    .required(),
});

const getUserValidation = async (req, res, next) => {
  try {
    const value = await getUserSchema.validateAsync({
      userId: req.params.userId
    });

    next();
  } catch (err) {
    badRequestResponse(res, err.message);
  }
};


export default getUserValidation;