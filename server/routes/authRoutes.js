import express from 'express';
import { User } from '../models/user.model.js'; 
const router = express.Router();


router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
     
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found. Please register first.' });
        }

    
        res.status(200).json({ message: 'Login successful' ,user});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error logging in' });
    }
});

export default router;
