import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import AuthRoute from "./routes/Auth.js";
import UsersRoute from "./routes/Users.js";
import ListRoute from "./routes/Listing.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use("/auth", AuthRoute);
app.use("/users", UsersRoute);
app.use("/listing", ListRoute);

app.get("/", (req, res) => {
  res.send("Hello from home");
  console.log("Home entered");
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server Runing on  localhost:${PORT}`));

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb conection success"))
  .catch((err) => console.log(`Concetion failed :`, err));
