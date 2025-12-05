import { Todo } from "../models/todo.model.js";

const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            console.log("Title is required.");
            return res.status(400).json({
                message: "Title is required.",
            });
        }

        const todo = await Todo.create({
            title,
            description: description || "",
            createdBy: req.user._id,
        });

        if (!todo) {
            return res.status(500).json({
                message: "Failed to create todo",
            });
        }

        const populatedTodo = await Todo.findById(todo._id).populate(
            "createdBy",
            "fullName email"
        );

        if (!populatedTodo) {
            return res.status(500).json({ message: "Failed to create todo" });
        }

        return res.status(201).json({
            message: "Todo created successfully",
            todo: populatedTodo,
        });
    } catch (error) {
        console.log("Error creating todo:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export { createTodo };
