import express from "express";
import usersRoute from "./routes/users.js";
import * as responseHandler from "./utils/responseHandler.js";
import { responseMessages } from "./utils/constants.js";

const {
  notFoundResponse,
  internalServerErrorResponse,
} = responseHandler;

const NOT_FOUND_URL_API_USERS = responseMessages.NOT_FOUND_URL_API_USERS;
const NOT_FOUND_URL_GENERAL = responseMessages.NOT_FOUND_URL_GENERAL;
const INTERNAL_SERVER_ERROR = responseMessages.INTERNAL_SERVER_ERROR;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended : true }));

app.use("/api/users", usersRoute);

// 404 handler specific to /api/users
app.use("/api/users", (req, res, next) => {
  notFoundResponse(res, NOT_FOUND_URL_API_USERS)
});

// General 404 handler for other routes
app.use((req, res, next) => {
  notFoundResponse(res, NOT_FOUND_URL_GENERAL)
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging purposes
  internalServerErrorResponse(res, INTERNAL_SERVER_ERROR)
});

app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`);
});

export default app;
