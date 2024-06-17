import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
    wallpaper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallpaper',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    value: {
      type: Number,
      required: true,
      enum: [1, -1],  // 1 for upvote, -1 for downvote
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  