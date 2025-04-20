require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const port = process.env.PORT || 8000;
const app = express();
//static file usage
app.use(express.static('public'));
//imports
const UUser = require("./model/user");
const { error } = require("console");
// MongoDB connection with error handling
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MONGODB CONNECTED"))
    .catch((err) => console.log("MongoDB Connection Error:", err));
    // Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
    // View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.get("/",(req,res)=>{
    return res.render("home")
})
app.post("/register", async (req, res) => {
    const { name, email, phone, schlno, section, branch, year } = req.body;
    const existuser = await UUser.findOne({ email });
    if (existuser) {
        return res.status(400).json({error : "Already student exists with the same email that you have entered!"})
    }
    const newEntry=new UUser({name, email, phone, schlno, section, branch, year})
    await newEntry.save()
    // await UUser.create({ name, email, phone, schlno, section, branch, year });
    return res.redirect("/");
});

app.listen(port,()=>{
    console.log(`Server started on ${port}!`)
})