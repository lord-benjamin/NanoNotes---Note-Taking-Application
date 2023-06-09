require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const connectDb = require("./server/config/db.js");
const session = require("express-session");
const passport = require("passport");
const mongoStore = require("connect-mongo");

const app = express();
const port = 3000 || process.env.PORT;

app.use(session({
    secret: "monitor mouse",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        maxAge: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

// Connect to Database
connectDb();

// Static files
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

// Templating engine
app.use(expressLayouts);
app.set("layout","./layouts/main-layout.ejs");
app.set("view engine","ejs");

// Routes
app.use("/",require("./server/routes/auth"));
app.use("/",require("./server/routes/index"));
app.use("/",require("./server/routes/dashboard"));

app.get("/dashboard/*",async(req,res)=>{
    res.status(404).render("404",{
        locals: {title: "404 - Not Found"},
        btnContent: "Go to Dashboard",
        url: "/dashboard",
        layout: "../views/layouts/error-layout.ejs"
    });
})
app.get("/dashboard/notes/*",async(req,res)=>{
    res.status(404).render("404",{
        locals: {title: "404 - Not Found"},
        btnContent: "Go to Dashboard",
        url: "/dashboard",
        layout: "../views/layouts/error-layout.ejs"
    });
})
app.get("*",async(req,res)=>{
    res.status(404).render("404",{
        locals: {title: "404 - Not Found"},
        btnContent: "Explore NanoNotes",
        url: "/",
        layout: "layouts/error-layout.ejs"
    });
})

app.listen(port,()=>{
    console.log(`Server started running on port ${port}`);
})
