const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: "Username is Required",
        },

        email: {
            type: String,
            unique: true,
            required: "Email is Required",
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },

        Thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],

        Friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;