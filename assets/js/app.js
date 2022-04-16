document.addEventListener("DOMContentLoaded", function () {
  let checkBox = document.getElementById("consent");
  let checkBoxAlt = document.getElementById("consent-alt");
  let nextBtn = document.getElementById("submit-button");
  let nextBtnAlt = document.getElementById("submit-button-alt");
  let inst1 = document.getElementById("instructions-one");
  let inst2 = document.getElementById("instructions-two");
  let instructionsBtn = document.getElementById("instructions-button");
  let debriefBtn = document.getElementById("debrief-button");
  let debriefBtnAlt = document.getElementById("debrief-button-alt");
  let debriefText = document.getElementById("debrief-text");
  let debriefTextAlt = document.getElementById("debrief-text-alt");
  let code = document.getElementById("code");
  let codeAlt = document.getElementById("code-alt");
  let subjectPool = false;
  let surveyURL;
  let test;

  if (document.URL.includes("csun-indscal")) {
    if (!localStorage.getItem("consent")) {
      if (!localStorage.getItem("subjectPool")) {
        window.location.href = "index.html";
      } else {
        window.location.href = "consent.html";
      }
    }
  }

  if (checkBox) {
    if(window.location.href.indexOf("uh-indscal") != -1){
      document.getElementById("hawaii").style.display = "block";
      localStorage.setItem('surveyURL', 'https://csunsbs.qualtrics.com/jfe/form/SV_6VZ7oMirqkA3clU?ID=');
      localStorage.setItem('test', 'UH-INDSCAL');
    } else {
      document.getElementById("CSUN-INDSCAL").style.display = "block";
      localStorage.setItem('surveyURL', 'https://csunsbs.qualtrics.com/jfe/form/SV_37YBKLHgonypjuu?ID=');
      localStorage.setItem('test', 'CSUN-INDSCAL');
    }
    checkBox.onchange = function () {
      if (this.checked) {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    };
  }

  if (checkBoxAlt) {
    checkBoxAlt.onchange = function () {
      if (this.checked) {
        nextBtnAlt.disabled = false;
      } else {
        nextBtnAlt.disabled = true;
      }
    };
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault;
      localStorage.setItem("consent", "true");
      window.location.href = "instructions.html";
    });
  }

  if (nextBtnAlt) {
    nextBtnAlt.addEventListener("click", function (e) {
      e.preventDefault;
      localStorage.setItem("subjectPool", "true");
      localStorage.setItem("consent", "true");
      window.location.href = "instructions.html";
    });
  }

  if (instructionsBtn) {
    instructionsBtn.addEventListener("click", function (e) {
      e.preventDefault;

      inst1.style.display = "none";

      if (inst2.style.display === "block") {
        window.location.href = "study.html";
      }

      inst2.style.display = "block";
    });
  }

  if (debriefBtn) {
    debriefBtn.addEventListener("click", function (e) {
      e.preventDefault;
      debriefText.style.display = "none";
      code.style.display = "block";
      localStorage.removeItem("consent");
    });
  }

  if (debriefBtnAlt) {
    debriefBtnAlt.addEventListener("click", function (e) {
      e.preventDefault;
      debriefTextAlt.style.display = "none";
      codeAlt.style.display = "block";
      localStorage.removeItem("consent");
      localStorage.removeItem("subjectPool");
    });
  }

  let faces = [
    "./assets/images/HF-010-106.jpg",
    "./assets/images/HF-007-002.jpg",
    "./assets/images/HF-005-022.jpg",
    "./assets/images/HF-002-054.jpg",
    "./assets/images/CFD-WF-233-112-N.jpg",
    "./assets/images/CFD-WF-231-099-N.jpg",
    "./assets/images/CFD-WF-035-024-N.jpg",
    "./assets/images/CFD-WF-011-002-N.jpg",
    "./assets/images/CFD-LF-252-172-N.jpg",
    "./assets/images/CFD-LF-231-260-N.jpg",
    "./assets/images/CFD-LF-215-157-N.jpg",
    "./assets/images/CFD-LF-214-090-N.jpg",
    "./assets/images/CFD-AF-253-130-N.jpg",
    "./assets/images/CFD-AF-246-242-N.jpg",
    "./assets/images/CFD-AF-224-026-N.jpg",
    "./assets/images/CFD-AF-214-139-N.jpg"
  ];

  facePairs = [];

  function pairs(arr){
    let l = arr.length;

    for(let i = 0; i < l; i++){
      for(let j = i + 1; j < l; j++){
        facePairs.push([arr[i], arr[j]]);
        facePairs.push([arr[j], arr[i]]);
      }
    }
    console.log("Original facePairs length: " + facePairs.length)
  }

  pairs(faces);

  let firebaseConfig = {
    apiKey: "AIzaSyCAiQq7AGfVPamHHSN_ObkAIsn8LFALkP8",
    authDomain: "mds-base-script.firebaseapp.com",
    databaseURL: "https://mds-base-script.firebaseio.com",
    projectId: "mds-base-script",
    storageBucket: "mds-base-script.appspot.com",
    messagingSenderId: "377022607691",
    appId: "1:377022607691:web:5f28b6a13b60a6168f38ce",
    measurementId: "G-NMTK4X8L1S",
  };

  let firebaseConfig2 = {
    apiKey: "AIzaSyARjmqlMf7UhFA8buKB5OIQ2VreaqMz4l0",
    authDomain: "facestudy-7aa90.firebaseapp.com",
    databaseURL: "https://facestudy-7aa90.firebaseio.com",
    projectId: "facestudy-7aa90",
    storageBucket: "facestudy-7aa90.appspot.com",
    messagingSenderId: "517061399659",
    appId: "1:517061399659:web:021d269da8ffd264b58d2e",
    measurementId: "G-TTFMER2NY5",
  };

  // Initialize Firebase
  let primaryDB = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  let secondaryDB = firebase.initializeApp(firebaseConfig2, "secondary");
  secondaryDB.analytics();

  let today = new Date();
  let todayString = today.toDateString();

  let refPrimary = primaryDB.database().ref(test + "/" + todayString);
  // let refSecondary = secondaryDB.database().ref(todayString);
  // let testRef = refPrimary.ref(test);
  let newUserRef = refPrimary.push();

  let id = newUserRef.key;

  class FaceRating {
    constructor(face1, face2, rating, id, test) {
      this.firstFace = face1;
      this.secondFace = face2;
      this.rating = rating;
      this.id = id;
      this.test = test;
    }
  }

  let count = 0;
  let temp = [0,0];
  let ratingsArr = [];
  let buttons = document.getElementsByClassName("rating-btn");
  let pair = [0,0];
  let counter = 0;
  let pairIndex;

  function loadFaces() {
    faceOneDiv = document.getElementById("face-one");
    faceTwoDiv = document.getElementById("face-two");

    do{
      pairIndex = Math.floor(Math.random() * facePairs.length);
      console.log("Length: " + facePairs.length);
      console.log("index: " + pairIndex);
      pair = facePairs[pairIndex];
      console.log(pair[0] + " " + temp[0] + "-----" + pair[1] + " " + temp[1]);
      counter++;
      console.log(counter)
      if(counter == facePairs.length){
        break;
      }
    } while (pair[0] === temp[0] || pair[0] === temp[1] || pair[1] === temp[0] || pair[1] === temp[1]);

    temp = pair;
    counter = 0;

    if (!faceOneDiv.firstElementChild || !faceTwoDiv.firstElementChild) {
      faceOneEl = document.createElement("img");
      faceTwoEl = document.createElement("img");

      faceOneEl.setAttribute("id", "face-1");
      faceTwoEl.setAttribute("id", "face-2");
      faceOneEl.setAttribute("src", pair[0]); 
      faceTwoEl.setAttribute("src", pair[1]); 
      faceOneEl.setAttribute("class", "img-fluid mx-auto d-block");
      faceTwoEl.setAttribute("class", "img-fluid mx-auto d-block");

      faceOneDiv.appendChild(faceOneEl);
      faceTwoDiv.appendChild(faceTwoEl);
    } else {
      faceOne = document.getElementById("face-1");
      faceTwo = document.getElementById("face-2");

      faceOneEl.setAttribute("src", pair[0]);
      faceTwoEl.setAttribute("src", pair[1]);
    }

    facePairs.splice(pairIndex, 1);
  }

  function disableButtons() {
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      button.setAttribute("disabled", true);
    }
  }

  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.onclick = function () {
      let rating = new FaceRating(
        pair[0].substring(16),
        pair[1].substring(16),
        parseInt(button.innerHTML),
        id,
        test
      );
      ratingsArr.push(rating);

      if (facePairs.length > 0) { 
        //239
        count++;
        console.log(count);
        loadFaces();
      } else {
        disableButtons();
        ratingsArr.forEach(function (element) {
          element.test = test;
          element.subjectPool = subjectPool;
        });
        writeToDBs()
      }
    };
  }

  let form = document.getElementById("form");
  surveyURL = localStorage.getItem('surveyURL');
  test = localStorage.getItem('test');
  let debrief = surveyURL + id + "&study=" + test;

  let errorCode = 2;

  function writeToDBs() {
    if (errorCode == 2) {
      secondaryDB
        .database()
        .ref(test + "/" + todayString + "/" + id)
        .set(ratingsArr)
        .then(function () {
          newUserRef
            .set(ratingsArr)
            .then(function () {
              console.log("boop");
              console.log(debrief);
              localStorage.clear()
              window.location.href = debrief;
            })
            .catch(function (error) {
              console.log(error);
              alert(
                "There was an error with your submission. Trying again. (error code 1)"
              );
              errorCode = 1;
              writeToDBs();
            });
        })
        .catch(function (error) {
          alert(
            "There was an error with your submission. Trying again. (error code 2)"
          );
          errorCode = 2;
          writeToDBs();
        });
    }

    if (errorCode == 1) {
      newUserRef
        .set(ratingsArr)
        .then(function () {
          form.reset();
          localStorage.clear();
          window.location.href = debrief;
        })
        .catch(function (error) {
          alert(
            "There was an error with your submission. Trying again. (error code 1)"
          );
          errorCode = 1;
          writeToDBs();
        });
    }
  }

  loadFaces();
});
