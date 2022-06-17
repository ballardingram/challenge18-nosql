const { Thought, User } = require("../models");

const thoughtController = {

    // ROUTES > GET ALL THOUGHTS
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: "Reactions",
            select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // ROUTES > GET SINGLE THOUGHT BY ID
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: "Reactions",
            select: "-__v",
        })
        .select("-__v")
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({message: "No thought with this ID!"});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // ROUTES > CREATE THOUGHT
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: body.userID},
                {$push: {thoughts: _id}},
                {new: true}
            );
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                return res
                .status(404)
                .json({ message: "No user found. Though added!"});
            }
            res.json({ message: "Thought added!"});
        })
        .catch((err) => res.json(err));
    },

    // ROUTES > UPDATE THOUGHT BY ID
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {
            new: true,
            runValidators: true,
        })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({message: "No thought found with this ID!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },

    // ROUTES > DELETE THOUGHT
    deleteThought({ params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({message: "No thought with this ID!"});
            }
            return User.findOneAndUpdate(
                {thoughts: params.id },
                {$pull: {thoughts: params.id}},
                {new: true}
            );
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                return res
                .status(404)
                .json({ message: "No user found. Thought deleted!"});
            }
            res.json({message: "Thought deleted!"});
        })
        .catch((err) => res.json(err));
    },

    // ROUTES > ADD REACTION
    addReaction ({ params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtID},
            {$addToSet: {reactions: body}},
            {new: true,
            runValidators: true}
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({message: "No thought with this ID!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },

    // ROUTES > DELETE REACTION
    deleteReaction ({ params }, res) {
        Thought.findOneAndDelete(
            {_id: params.id}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;