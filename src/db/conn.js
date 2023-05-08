const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb+srv://skrohithossain2000:ZM72Svh2eBK2QiYt@cluster0.svd56m5.mongodb.net/Backend", {
    useNewUrlParser: true


}).then(() => {
    console.log("MongoDB is connected");
}).catch((error) => {
    console.log(error);
})