import { Todo } from "../models/todo.model.js";

const createTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title) {
            console.log("Title is required.");
            return res.status(400).json({
                message: "Title is required.",
            });
        }

        const todo = await Todo.create({
            title,
            description: description || "",
            status: status,
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

const fetchTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ createdBy: req.user._id });

        return res.status(200).json({
            message: "Todos fetched successfully",
            count: todos.length,
            todos: todos,
        });
    } catch (error) {
        console.log("Error fetching todos:", error);
        res.status(500).json({
            message: "Failed to fetch todos",
            error: error.message,
        });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
            });
        }

        const updatedTodo = await Todo.findOneAndUpdate(
            {
                _id: id,
                createdBy: req.user._id,
            },
            {
                status: status,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedTodo) {
            return res.status(404).json({
                message:
                    "Todo not found or you are not authorized to update it",
            });
        }

        return res.status(200).json({
            message: "Todo status updated successfully",
            todo: updatedTodo,
        });
    } catch (error) {
        console.log("Error updating status:", error);
        res.status(500).json({
            message: "Failed to update status",
            error: error.message,
        });
    }
};

export { createTodo, fetchTodos, updateStatus };
