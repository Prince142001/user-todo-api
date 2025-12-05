import { Router } from "express";
import { createTodo } from "../controllers/todo.controller.js";
import { verifyJwtToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwtToken);
router.route("/").post(createTodo);

export default router;
