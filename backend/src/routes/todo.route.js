import { Router } from "express";
import { createTodo, fetchTodos } from "../controllers/todo.controller.js";
import { verifyJwtToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwtToken);
router.route("/").post(createTodo).get(fetchTodos);

export default router;
