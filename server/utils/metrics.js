import { Metrics } from "../models/metric.model.js";

// Function to update metrics when kudos are given
const updateMetrics = async (senderId, recipientId, category) => {
    try {
        // await Metrics.findOneAndUpdate(
        //     { userId: senderId },
        //     {
        //         $inc: { kudosSent: 1, [`categories.${category}`]: 1 }
        //     },
        //     { upsert: true, new: true }
        // );

        // // Increment kudosReceived for recipient
        // await Metrics.findOneAndUpdate(
        //     { userId: recipientId },
        //     {
        //         $inc: { kudosReceived: 1, [`categories.${category}`]: 1 }
        //     },
        //     { upsert: true, new: true }
        // );
        await Metrics.findOneAndUpdate(
            { userId: senderId },
            { $inc: { kudosSent: 1, [`categories.${category}`]: 1 } },
            { upsert: true, new: true }
        );

        await Metrics.findOneAndUpdate(
            { userId: recipientId },
            { $inc: { kudosReceived: 1, [`categories.${category}`]: 1 } },
            { upsert: true, new: true }
        );
    } catch (error) {
        console.error('Error updating metrics:', error);
        throw error;
    }
};

export  { updateMetrics } 
