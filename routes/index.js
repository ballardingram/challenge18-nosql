// REQUIRED > EXTERNAL ROUTES
const router = require('express').Router();
const apiRoutes = require('./api');

// ROUTES > USE API ROUTES
router.use('/api', apiRoutes);

// ROUTES > API ROUTE ERROR
router.use((req, res) => {
    res.status(404);
});

module.exports = router;