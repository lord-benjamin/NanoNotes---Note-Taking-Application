const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Note",NoteSchema);
