import { Router } from "express";
import pollRouter from "./poll.route";

const routes = Router();

routes.use("/poll", pollRouter);

export default routes;
