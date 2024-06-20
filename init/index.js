const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '666dc9fcc8b794a4ebde401b'}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();
