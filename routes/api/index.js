// REQUIRED > LINKS TO OTHER ROUTES
const router = require('express').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts');

// ROUTES > USE
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;