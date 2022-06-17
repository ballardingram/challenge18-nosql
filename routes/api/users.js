// MAPPING > THROUGH ROUTE
const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user');

// ROUTES > GET ALL USERS
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// ROUTES > GET USER BY ID
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// ROUTES > GET FRIEND BY ID
router
    .route('/userID/friends/:friendID')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;