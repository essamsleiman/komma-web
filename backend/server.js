const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
require("./passport"); // added for google auth
const bodyParser = require("body-parser"); // added for google auth
const session = require("express-session"); // added for google auth
const port = process.env.PORT || 5000;
require("dotenv").config();
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser"); // parse cookie header

// db setup
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// cookie session
app.use(
  cookieSession({
    name: "session",
    keys: ["hello"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(express.json());

/* Router for Auth  */

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
