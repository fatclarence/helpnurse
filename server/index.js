import express from "express";
// import OktaJwtVerifier from "@okta/jwt-verifier";
import cors from "cors";
import dotenv from "dotenv";

import internalRoutes from "./routes/routes.js";

import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/internal", internalRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server runing on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
