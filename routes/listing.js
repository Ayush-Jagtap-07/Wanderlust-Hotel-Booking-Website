const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get( wrapAsync ( listingController.index )) // Index Route
.post( isLoggedin, upload.single("listing[image]"), validateListing, wrapAsync( listingController.createListing )); // Create Route 


// New Route
router.get("/new", isLoggedin, listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync( listingController.showListing )) // Show Route
.put( isLoggedin, isOwner, upload.single("listing[image]"), validateListing, wrapAsync( listingController.updateListing )) // Update Route
.delete( isLoggedin, isOwner, wrapAsync( listingController.deleteListing )); // Delete Route

// Edit Route
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync( listingController.renderEditForm ));

module.exports = router ;