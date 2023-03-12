import express from "express";
import { getUserInfo } from "../controllers/user.js";

const routes = express.Router();

routes.get("/:id", getUserInfo);

export default routes;
