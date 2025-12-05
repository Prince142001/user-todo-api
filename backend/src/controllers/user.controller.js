import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        // console.log(fullName, email, password);
        if (!fullName || !email || !password) {
            console.log("All fields are required");
            return res.status(400).json({
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

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log("Email and password required.");
            res.status(400).json({
                message: "Email and password required.",
            });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.log("User not found.");
            return res.status(404).json({
                message: "User not found.",
            });
        }

        const isPasswordCorrect =
            await existingUser.isPasswordCorrect(password);

        if (!isPasswordCorrect) {
            console.log("Unauthorized user.");
            return res.status(401).json({
                message: "Invalid user credentials.",
            });
        }

        const token = existingUser.generateAccessToken();

        return res.status(200).json({
            message: "Login successfully",
            token: token,
            user: {
                _id: existingUser._id,
                fullname: existingUser.fullName,
                email: existingUser.email,
            },
        });
    } catch (error) {
        console.log("Error in login user", error);
        res.status(500).json({
            message: "Failed to login user.",
        });
    }
};

const userProfile = async (req, res) => {
    try {
        res.status(200).json({
            message: "User profile fetched successfully",
            User: req.user,
        });
    } catch (error) {
        console.log("Error in fetching user profile", error);
        res.status(500).json({
            message: "Failed to fetch user profile.",
        });
    }
};

export { registerUser, loginUser, userProfile };
