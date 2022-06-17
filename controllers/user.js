const { User, Thought } = require('../models');

const userController = {

    // ROUTES > GET ALL USERS
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: "friends",
            select: "-__v",
            strictPopulate: false,
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // ROUTES > GET SINGLE USER
    getUserById({params}, res) {
        User.findOne({ _id: params.id})
        .then((dbUserData) => {
            if (!dbUserData) {
                return res
                .status(404)
                .json({message: "No user found with this id!"});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // ROUTES > CREATE USER
    createUser ({ body }, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    },

    //UPDATE USER BY ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({message: "No user found with this ID!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    // ROUTES > DELETE USER
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({message: "No user with this ID!"});
            }
            return Thought.deleteMany({_id: {$in: dbUserData.thoughts}});
        })
        .then(() => {
            res.json({message: "User and their thoughts, deleted!"});
        })
        .catch((err) => res.json(err));
    },

    //ROUTES > ADD FRIEND
    addFriend({ params}, res) {
        User.findOneAndUpdate(
            {_id: params.userID},
            {$addToSet: {friends: params.friendID}},
            {new: true,
            runValidators: true}
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No friend found with this ID!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    // ROUTES > DELETE FRIEND
    deleteFriend({ params}, res) {
        User.findOneAndDelete(
            {_id: params.userID},
            {$pull: {friends: params.friendID}},
            {new: true }
        )
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({ message: "No friend found with this ID!"});
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },
};

module.exports = userController;