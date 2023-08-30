const express = require('express');
const bimRoute = require('./bim.route');
const router = express.Router();

const routes = [
    {
        path : '',
        route : bimRoute
    }
];

routes.forEach(route => {
    router.use(route.path, route.route);
});

module.exports = router;