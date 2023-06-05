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
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        maxAge: Date.now() + (604800000) // 7 days
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
app.use(express.static("public"));

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
        btnContent: "Go to Dashboard",
        url: "/dashboard",
        layout: "../views/layouts/404-layout.ejs"
    });
})
app.get("/dashboard/notes/*",async(req,res)=>{
    res.status(404).render("404",{
        btnContent: "Go to Dashboard",
        url: "/dashboard",
        layout: "../views/layouts/404-layout.ejs"
    });
})
app.get("*",async(req,res)=>{
    res.status(404).render("404",{
        btnContent: "Explore NanoNotes",
        url: "/",
        layout: "layouts/404-layout.ejs"
    });
})

app.listen(port,()=>{
    console.log(`Server started running on port ${port}`);
})