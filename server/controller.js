const db = [
  {
    challengeId: 1,
    challengeName: "max of two",
    difficultyLevel: "easy",
    challengeDate: "2023-06-21",
  },
  {
    challengeId: 2,
    challengeName: "fizz buzz",
    difficultyLevel: "easy",
    challengeDate: "2023-06-22",
  },
  {
    challengeId: 3,
    challengeName: "find the range",
    difficultyLevel: "easy",
    challengeDate: "2023-06-23",
  },
  {
    challengeId: 4,
    challengeName: "add to zero",
    difficultyLevel: "medium",
    challengeDate: "2023-06-26",
  },
];

let challengeId = 5;
module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },
  getFortune: (req, res) => {
    const fortunes = [
      "A soft voice may be awfully persuasive.",
      "Believe in yourself and others will too.",
      "Dedicate yourself with a calm mind to the task at hand.",
      "Don’t confuse recklessness with confidence.",
      "For the things we have to learn before we can do them, we learn by doing them.",
      "Physical activity will dramatically improve your outlook today.",
    ];
    const randomFortuneId = Math.floor(Math.random() * fortunes.length);
    const randomFortune = fortunes[randomFortuneId];
    res.status(200).send(randomFortune);
  },

  addChallenge: (req, res) => {
    const { challengeName, difficultyLevel, challengeDate } = req.body;
    const newObj = {
      challengeId,
      challengeName,
      difficultyLevel,
      challengeDate,
    };
    db.push(newObj);
    res.status(200).send(db);
    challengeId++;
  },
  getChallenges: (req, res) => {
    if (req.query.name) {
      const filteredItems = db.filter((name) =>
        name.toLowerCase().includes(req.query.name)
      );
      res.status(200).send(filteredItems);
    } else {
      res.status(200).send(db);
    }
  },

  updateChallenge: (req, res) => {
    const { id } = req.params;
    const { newChallengeName, newDifficultyLevel, newChallengeDate } =
      req.query;
    //use the id to locate the resource/object
    const indexofChal = db.findIndex((chal) => chal.challengeId === +id);
    if (indexofChal === -1) {
      res.status(400).send("Challenge not found");
      return;
    }
    //reassign the object/key-value pairs
    db[indexofChal].challengeName = newChallengeName;
    db[indexofChal].difficultyLevel = newDifficultyLevel;
    db[indexofChal].challengeDate = newChallengeDate;
    res.status(200).send(db);
  },
  deleteChallenge: (req, res) => {
    const { id } = req.params;

    //use the id to locate the resource/object
    const indexofChal = db.findIndex((chal) => chal.challengeId === +id);
    if (indexofChal === -1) {
      res.status(400).send("Challenge not found");
      return;
    }
    //delete the object
    db.splice(indexofChal, 1);
    res.status(200).send(db);
  },
  getSingleChallenge: (req, res) => {
    const { id } = req.params;

    //use the id to locate the resource/object
    const indexofChal = db.findIndex((chal) => chal.challengeId === +id);
    if (indexofChal === -1) {
      res.status(400).send("Challenge not found");
      return;
    }

    res.status(200).send(db[indexofChal]);
  },
};
