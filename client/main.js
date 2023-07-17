const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");

const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

const getFortune = () => {
  axios.get("http://localhost:4000/api/fortune").then((res) => {
    const data = res.data;
    alert(data);
  });
};

complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);

const BASE_URL = `http://localhost:4000`;
//bring in the display section element
const displaySection = document.querySelector("#display-section");
//grab html elements we wanna work with
const addForm = document.querySelector("#add-challenge");
const newChallenge = document.querySelector("#newChallenge");
const newDifficultyLevel = document.querySelector("#newDifficultyLevel");
const newChallengeDate = document.querySelector("#newChallengeDate");
const updateForm = document.querySelector("#update-form");
const challengeId = document.querySelector("#challenge-id");
const updateChallenge = document.querySelector("#update-challenge");
const updateDifficultyLevel = document.querySelector("#update-difficultyLevel");
const updateChallengeDate = document.querySelector("#update-challengeDate");
const deleteChallenge = (id) => {
  axios
    .delete(`${BASE_URL}/api/challenge/${id}`)
    .then((res) => createChallengeCard(res.data))
    .catch((err) => console.error(err));
};

//creates the card for songs/response
createChallengeCard = (challengeArr) => {
  displaySection.innerHTML = ``;
  challengeArr.map((chal) => {
    const holdingDiv = document.createElement("div");
    holdingDiv.innerHTML = `
     <div class="line"></div>
            <ul>
            <li>Id: ${chal.challengeId}</li>
                <li>Challenge Name: ${chal.challengeName}</li>
                <li>challenge Difficulty Level: ${chal.difficultyLevel}</li>
                <li>Challenge Date: ${chal.challengeDate}</li>
                
                <button class="btn" onclick="deleteChallenge(${chal.challengeId})"> Delete </button>
            </ul>
        `;
    displaySection.appendChild(holdingDiv);
  });
};

createSingleChallengeCard = (challenge) => {
  displaySection.innerHTML = ``;
  const holdingDiv = document.createElement("div");
  holdingDiv.innerHTML = `
  <div class="line"></div>
            <ul>
            <li>Id: ${challenge.challengeId}</li>
                <li>Challenge Name: ${challenge.challengeName}</li>
                <li>challenge Difficulty Level: ${challenge.difficultyLevel}</li>
                <li>Challenge Date: ${challenge.challengeDate}</li>
                <button onclick="deleteChallenge(${challenge.challengeId})" class="btn"> Delete </button>
            </ul>
        `;
  displaySection.appendChild(holdingDiv);
};

//gets all challenges
const getChallenges = () => {
  axios
    .get(`${BASE_URL}/api/challenge`)
    .then((res) => {
      console.log(res.data);
      createChallengeCard(res.data);
    })
    .catch((err) => console.error(err));
};

//adds new challenge to db
const addFormHandler = (e) => {
  e.preventDefault();
  const body = {
    challengeName: newChallenge.value,
    difficultyLevel: newDifficultyLevel.value,
    challengeDate: newChallengeDate.value,
  };
  axios
    .post(`${BASE_URL}/api/challenge`, body)
    .then((res) => createChallengeCard(res.data))
    .catch((err) => console.error(err));
  newChallenge.value = ``;
  newDifficultyLevel.value = ``;
  newChallengeDate.value = "";
};

const updateHandler = (e) => {
  e.preventDefault();
  axios
    .put(
      `${BASE_URL}/api/challenge/${challengeId.value}?newChallengeName=${updateChallenge.value}&newDifficultyLevel=${updateDifficultyLevel.value}&newChallengeDate=${updateChallengeDate.value}`
    )
    .then((res) => createChallengeCard(res.data))
    .catch((err) => console.error(err));
  challengeId.value = "";
  updateChallenge.value = "";
  updateDifficultyLevel.value = "";
  updateChallengeDate.value = "";
};

//event-listeners
document.addEventListener("DOMContentLoaded", getChallenges);
addForm.addEventListener("submit", addFormHandler);
updateForm.addEventListener("submit", updateHandler);

const getAllChallengesBtn = document.querySelector(".getAllChallenges");

getAllChallengesBtn.addEventListener("click", getChallenges);

const getSingleChallengeBtn = (id) => {
  axios
    .get(`${BASE_URL}/api/challenge/${id}`)
    .then((res) => createSingleChallengeCard(res.data))
    .catch((err) => console.error(err));
};

const searchIdBtn = document.querySelector("#searchIdBtn");
const searchId = document.querySelector("#searchId");
searchIdBtn.addEventListener("click", () =>
  getSingleChallengeBtn(searchId.value)
);

/*const getQueryChallenge = (str) => {
  axios
    .get(`${BASE_URL}/api/challenge/?name = ${str}`)
    .then((res) => createChallengeCard(res.data))
    .catch((err) => console.error(err));
};

const queryInput = document.querySelector("#query-input");
const querySubmitBtn = document.querySelector("#getQuerySubmit");

querySubmitBtn.addEventListener("click", () =>
  getQueryChallenge(queryInput.value)
);*/
