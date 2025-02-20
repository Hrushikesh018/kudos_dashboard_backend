import express from "express"
import { User } from "../models/user.model.js";
const router = express.Router();

// Route to create a new user
router.post('/add-user', async (req, res) => {
    const { name, email } = req.body;

    try {
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating user' });
    }
});
//me api
router.get('/user-details', async (req, res) => {
    const { userId } = req.query;  // Assume userId is passed as query parameter or token can be used for logged-in user

    try {
        // Fetch user details
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch kudos sent and received
        const sentKudos = await Kudo.find({ sender: userId });
        const receivedKudos = await Kudo.find({ receiver: userId });

        // Return user details with kudos sent/received
        res.status(200).json({
            user: { name: user.name, email: user.email },
            sentKudos,
            receivedKudos,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching user details' });
    }
});
//get all users
router.post('/', async (req, res) => {
    try {
        const { userId } = req.body; // Get current user's ID from the request body

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Fetch all users except the current user
        const users = await User.find({ _id: { $ne: userId } });

        res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching users' });
    }
});
export default router;
