import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userSchema from "./models/user.js";
import questionSchema from "./models/question.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  // Set Content Security Policy (CSP) headers for security
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' http://localhost:3000; script-src 'self' 'unsafe-inline'; img-src 'self' http://localhost:3000/favicon.ico"
  );
  next();
});

const usersdbURI =
  "mongodb+srv://user1:1234@cluster0.pgrnskk.mongodb.net/user?retryWrites=true&w=majority";
const questionsdbURI =
  "mongodb+srv://user1:1234@cluster0.pgrnskk.mongodb.net/trivia-questions?retryWrites=true&w=majority";

const userConn = mongoose.createConnection(usersdbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const questionConn = mongoose.createConnection(questionsdbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = userConn.model("User", userSchema);
const Question = questionConn.model("Question", questionSchema);

// Rest of your code ...

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Route for serving the index.html file
// It's moved here, after the other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
