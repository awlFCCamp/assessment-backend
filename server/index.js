const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const {
  getCompliment,
  getFortune,
  addChallenge,
  getChallenges,
  updateChallenge,
  deleteChallenge,
  getSingleChallenge,
} = require("./controller");

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);

//endpoints
app.get("/api/challenge", getChallenges);
app.get("/api/challenge/:id", getSingleChallenge);
app.post("/api/challenge", addChallenge);
app.put("/api/challenge/:id", updateChallenge);
app.delete("/api/challenge/:id", deleteChallenge);

app.listen(4000, () => console.log("Server running on 4000"));
