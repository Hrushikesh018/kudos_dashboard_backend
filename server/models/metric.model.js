import mongoose from "mongoose";

const MetricsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    kudosSent: { type: Number, default: 0 },
    kudosReceived: { type: Number, default: 0 },
    categories: {
        type: Map, 
        of: Number, 
        default: {}
    }
} ,{ timestamps: true } );

export const Metrics = mongoose.model('Metrics', MetricsSchema);
