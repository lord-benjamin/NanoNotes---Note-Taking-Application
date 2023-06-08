const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now() + 19800000
    }
});

module.exports = mongoose.model("User",UserSchema);
