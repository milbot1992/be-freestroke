const express = require("express")
const {	getAllLocations,getLocationById} = require('../app/controllers/locations_controller');
const {	getReviewsByLocationId, postReview, deleteReview } = require("../app/controllers/reviews_controller");
const { handleMongoErrors, handleErrors } = require("./error-handler");

const app = express()
app.use(express.json())

// app.get("/api", getAllEndpoints);
app.get("/api/locations", getAllLocations);
app.get("/api/locations/:location_id", getLocationById);
app.get("/api/locations/:location_id/reviews", getReviewsByLocationId )
app.post("/api/location/:location_id/reviews", postReview)
// app.patch("/api/locations/:location_id", patchLocationById)
app.delete("/api/reviews/:review_id", deleteReview)

app.all("/*", (req, res) => {
    res.status(404).send({ message: "Not found" });
});

// Error handling
app.use(handleErrors)
app.use(handleMongoErrors)



module.exports = app;

