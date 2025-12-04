import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        // console.log(fullName, email, password);
        if (!fullName || !email || !password) {
            console.log("All fields are required");
            return res.status(201).json({
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("User with this email is already exist.");
            return res.status(409).json({
                message: "User with this email is already exist.",
            });
        }

        const user = await User.create({
            fullName,
            email,
            password,
        });

        const createdUser = await User.findById(user._id).select("-password");

        if (!createdUser) {
            return res.status(500).json({
                message: "Something went wrong while creating user",
            });
        }

        const token = user.generateAccessToken();

        return res.status(201).json({
            message: "User registered successfully",
            token: token,
            user: createdUser,
        });
    } catch (error) {
        console.log("Error in register user...", error);
        res.status(500).json({
            message: "Failed to register user.",
        });
    }
};

export { registerUser };
