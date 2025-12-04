const registerUser = async (req, res) => {
    try {
        return res.status(400).json({
            message: "Message OK...",
        });
    } catch (error) {
        console.log("Error in register user...");
        res.status(500).json({
            message: "Failed to register user.",
        });
    }
};

export { registerUser };
