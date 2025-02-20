
import express from 'express';
import { Metrics } from '../models/metric.model.js';

const router = express.Router();
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await Metrics.find()
            .sort({ kudosReceived: -1 }) 
            .populate('userId', 'name'); 

        res.status(200).json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Error fetching leaderboard' });
    }
});


export default router;