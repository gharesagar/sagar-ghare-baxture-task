import express from "express";
import usersRoute from "./routes/users.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended : true }));

app.use("/api/users", usersRoute);

app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`);
});
