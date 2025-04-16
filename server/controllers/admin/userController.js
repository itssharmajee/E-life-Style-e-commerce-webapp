import { User } from "../../models/user.js";



export const fetchAllUsersDetails = async (req, res) => {
    try {
        const users = await User.find({});

        if (!users.length) {
            return res.status(404).json({
                success: false,
                message: "No users found!",
            });
        }

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
}