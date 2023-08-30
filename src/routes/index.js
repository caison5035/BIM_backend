const express = require("express");
const bimRoute = require("./bim.route");
const authRoute = require("./auth.route");
const router = express.Router();
const auth = require("./../middleware/auth");
const routes = [
  {
    path: "/bim",
    auth,
    route: bimRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

routes.forEach((route) => {
  if (route.auth) {
      router.use(route.path, auth, route.route);
    } else {
      router.use(route.path, route.route);
  }
});

module.exports = router;
