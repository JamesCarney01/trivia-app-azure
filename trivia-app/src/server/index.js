import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userSchema from "./models/user.js";
import questionSchema from "./models/question.js";

/**
 * Configure and create the Express app.
 */
const app = express();
app.use(cors());
app.use(express.json());

/**
 * Configure the Content Security Policy (CSP) to allow the GET request.
 */
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' http://localhost:3000; script-src 'self' 'unsafe-inline'; img-src 'self' http://localhost:3000/favicon.ico"
  );
  next();
});

/**
 * Connection strings for the databases.
 */
const usersdbURI =
  "mongodb+srv://user1:1234@cluster0.pgrnskk.mongodb.net/user?retryWrites=true&w=majority";
const questionsdbURI =
  "mongodb+srv://user1:1234@cluster0.pgrnskk.mongodb.net/trivia-questions?retryWrites=true&w=majority";

/**
 * Create separate connections to each database.
 */
const userConn = mongoose.createConnection(usersdbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const questionConn = mongoose.createConnection(questionsdbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * Create models for each connection.
 */
const User = userConn.model("User", userSchema);
const Question = questionConn.model("Question", questionSchema);

/**
 * Express Routes
 */

/**
 * Endpoint to handle the POST request for updating the user's username.
 */
app.post("/userName", (req, res) => {
  const { userName } = req.body;
  console.log("username in index.js: " + userName);

  User.findOneAndUpdate(
    { userName },
    { $set: { userName } },
    { upsert: true, new: true }
  )
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * Endpoint to handle the GET request for retrieving the username.
 */
app.get("/username", (req, res) => {
  User.findOne({})
    .then((user) => res.json(user.userName))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * Endpoint to handle the GET request for retrieving the questions.
 */
app.get("/questions", (req, res) => {
  Question.find({})
    .then((questions) => res.json(questions))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * Endpoint to handle the POST request for updating the user's score and time.
 */
app.post("/scoreAndTime", (req, res) => {
  const { userName, score, time } = req.body;
  console.log("Score and time received:", userName, score, time);

  User.findOneAndUpdate(
    { userName },
    { score, time },
    { upsert: true, new: true }
  )
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * Endpoint to get the top 5 users with the highest score.
 */
app.get("/topUsers", async (req, res) => {
  try {
    const users = await User.find({}, "userName score time")
      .sort({ score: -1 })
      .limit(5)
      .exec();

    res.json(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

/**
 * Start the server and listen on port 3000.
 */
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
