import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  kudosReceived: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kudo'
  }],
  kudosGiven: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kudo'
  }]
}, { timestamps: true } );

export  const User = mongoose.model('User', userSchema);