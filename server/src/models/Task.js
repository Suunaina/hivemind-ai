import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    prompt: {
      type: String,
      required: [true, 'Task prompt is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['processing', 'completed', 'failed'],
      default: 'processing'
    },
    plannerOutput: {
      type: String,
      required: true
    },
    researcherOutput: {
      type: String,
      required: true
    },
    developerOutput: {
      type: String,
      required: true
    },
    reviewerOutput: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
