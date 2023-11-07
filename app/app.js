const express = require("express")
const app = express()
app.use(express.json())



const {
	getAllLocations,
    getLocationById
} = require('../app/controllers/locations_controller');


const { handleMongoErrors, handleErrors } = require("./error-handler");


// app.get("/api", getAllEndpoints);
app.get("/api/locations", getAllLocations);
app.get("/api/locations/:location_id", getLocationById);
// app.get("/api/location/:location_id/reviews", getReviewsById )
// app.post("/api/location/:location_id/reviews", postReview)
// app.patch("/api/locations/:location_id", patchLocationById)
// app.delete("/api/location/:location_id/reviews", removeReview)

// app.use(handleMongoErrors)
// app.use(handleErrors)
app.use((err, req, res, next) => {
    if (err.status){
        res.status(err.status).send({message: err.message})
    } else {
        console.log(err);
        res.status(500).send({message: "Internal Server Error"})
    }
})


app.all("*", (req, res) => {
    res.status(404).send({ msg: "Not found" });
});


module.exports = app;
