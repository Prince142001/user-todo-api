import { Router } from "express";
import {
    createTodo,
    fetchTodos,
    updateStatus,
} from "../controllers/todo.controller.js";
import { verifyJwtToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwtToken);
router.route("/").post(createTodo).get(fetchTodos);

router.route("/:id").patch(updateStatus);

export default router;
