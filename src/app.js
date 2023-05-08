const express = require("express");
const db = require("./db/conn")
const path = require("path");
const route = require("../Router/route")
const registerModel = require("./model/registerModel")
const logInModel = require("./model/logInModel")


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const staticPath = path.join(__dirname, "../public")
    //console.log(staticPath)
app.use(express.static(staticPath))

app.get("/", (req, res) => {
    res.render("index")
});


app.post("/register", async(req, res) => {
    try {
        let password = req.body.password;
        let confirmpassword = req.body.confirmpassword;

        if (password === confirmpassword) {
            let registerCollection = new registerModel({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            })

            let registered = await registerCollection.save();
            res.send("successfully registered.");

        } else {
            res.send("passwords are not matching.")
        }


    } catch (error) {
        res.send(error)
    }
})


app.post("/logIn", async(req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        // console.log(email, password)

        //console.log("hello");
        let userLogIn = await registerModel.findOne({ email: email });
        // console.log(userLogIn.password);
        if (userLogIn) {
            if (userLogIn.password === password) {
                res.send("Log In Successfull");
            } else {
                res.send("Invalid credentials");
            }
        }


    } catch (error) {
        res.send(error)
    }
})

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});