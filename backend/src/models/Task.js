const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["pending", "in progress", "completed", "cancelled"], // Додаємо "cancelled"
        default: "pending",
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

taskSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;