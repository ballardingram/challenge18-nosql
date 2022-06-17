// MAPPING > THOUGH ROUTE
const router = require('express').Router();
const { put } = require('.');
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thought');

// ROUTES > GET ALL THOUGHTS
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

// ROUTES > GET SINGLE THOUGHT
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// ROUTES > GET THOUGHT BY ID AND REACTION
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// ROUTES > GET THOUGHT ADD REACTION
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// ROUTES > GET THOUGH DELETE REACTION
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

    module.exports = router;