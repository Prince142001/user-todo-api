import { Router } from "express";
import {
    createTodo,
    fetchTodos,
    updateStatus,
    deleteTodo,
} from "../controllers/todo.controller.js";
import { verifyJwtToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwtToken);
router.route("/").post(createTodo).get(fetchTodos);

router.route("/:id").patch(updateStatus).delete(deleteTodo);

export default router;
