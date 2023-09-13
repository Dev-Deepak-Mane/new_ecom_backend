const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use((req, res, next) => {
  res.setHeader('https://frontend-thedpmane.vercel.app', 'http://localhost:3000');
  // Add other necessary headers as needed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(
  cors({
    origin: ['https://frontend-thedpmane.vercel.app','http://localhost:3000'],
    credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization',
  })
);
//app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/", product);
app.use("/", user);
app.use("/", order);
app.use("/", payment);

//app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  res.send("Welcome to Dell");
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Connecting to database
connectDatabase();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
