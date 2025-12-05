import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJwtToken = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        const token = authHeader.replace("Bearer ", "");

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodeToken?._id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Invalid access token.", error.message);
        res.status(401).json({
            message: "Invalid access token.",
        });
    }
};

export { verifyJwtToken };
