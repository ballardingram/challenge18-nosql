const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            // match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]//
            match: [/.+@.+\..+/, 'Enter a valid e-mail address!']
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
    return this.Friends.length;
});

const User = model("User", UserSchema);

module.exports = User;