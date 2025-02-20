import mongoose from "mongoose";

const kudoSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500,
    },
    category: {
      type: String,
      required: true,
      enum: ["Teamwork", "Innovation", "Leadership", "Excellence", "Help"],
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Kudo = mongoose.model("Kudo", kudoSchema);
