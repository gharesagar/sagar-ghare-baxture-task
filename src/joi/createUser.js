import Joi from "joi";
import { badRequestResponse } from "../utils/responseHandler.js";

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  age: Joi.number().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
});

const createUserValidation = async (req, res, next) => {
  try {
    const value = await createUserSchema.validateAsync({
      username: req.body.username,
      age: req.body.age,
      hobbies: req.body.hobbies
    });

    next();
  } catch (err) {    
    badRequestResponse(res, err.message);
  }
};


export default createUserValidation;