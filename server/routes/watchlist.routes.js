const express = require("express");
const router = express.Router();
const protectRoute = require('../middleware/protectRoute')
const watchlistController = require("../controllers/watchlist.controller");

router.post("/add/:userId/:movieId", protectRoute,watchlistController.addToWatchlist);

router.delete("/remove/:userId/:movieId", protectRoute,watchlistController.removeFromWatchlist);

router.get("/:id", protectRoute,watchlistController.getWatchlist);

module.exports = router;
