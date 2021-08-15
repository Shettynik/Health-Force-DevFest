const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongoose connected successfully!")
}).catch((error) => {
    console.log(error.message)
});