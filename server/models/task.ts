import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

export default mongoose.model('Task', TaskSchema);
