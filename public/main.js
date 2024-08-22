let cardArray = [];
let temp = "";

let finalArray = [];

let hsk1Array = [];
let hsk2Array = [];
let hsk3Array = [];
let hsk4Array = [];
let hsk5Array = [];
let hsk6Array = [];

let currentLocation = "homepage";

processor(hskraw);
subdivider(cardArray);

document.onkeyup = function (e) {
  if (e.which == 13 && currentLocation === "pinyinTest") {
    submitPinyin();
  }
};

// processor works
// puts each line from the text file into an array
// then puts each of those arrays into cardArray.
// checks for and accounts for multiple entries on a given line.

function processor(str) {
  let spaceCounter = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      spaceCounter = spaceCounter + 1;
    }
    if (/\n/.test(str[i])) {
      cardArray.push(temp);
      temp = "";
    } else if (i === 0) {
      temp = temp + str[0];
    } else if (i === str.length - 1) {
      temp = temp + str[i];
      cardArray.push(temp);
      temp = "";
    } else if (
      spaceCounter > 1 &&
      str[i] === " " &&
      /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/.test(
        str[i + 1]
      )
    ) {
      cardArray.push(temp);
      temp = "";
      spaceCounter = 0;
    } else {
      temp = temp + str[i];
    }
  }
}

// subdivider works, sets the appropriate HSK level array to a 2D array.
// pulls data from cardArray.
// array is in the format [[hanzi, pinyin, english],[hanzi, pinyin, english],[hanzi, pinyin, english],[hanzi, pinyin, english]].

function subdivider(arr) {
  let spaceCounter = 0;
  let character = "";
  let pinyin = "";
  let english = "";
  let subtemp = "";

  for (let i = 0; i < arr.length; i++) {
    if (i > 0) {
      if (
        /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/.test(
          character
        )
      ) {
        finalArray.push([character, pinyin, english]);
      }
      character = "";
      pinyin = "";
      english = "";
      subtemp = "";
    }

    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === " " && spaceCounter === 0) {
        spaceCounter = spaceCounter + 1;
        character = subtemp;
        subtemp = "";
      } else if (arr[i][j] === " " && spaceCounter === 1) {
        spaceCounter = spaceCounter + 1;
        pinyin = subtemp;
        subtemp = "";
      } else if (
        j === arr[i].length - 1 &&
        arr[i][j] != "ろ" &&
        arr[i][j] != "ご" &&
        arr[i][j] != "し" &&
        arr[i][j] != "さ" &&
        arr[i][j] != "に" &&
        arr[i][j] != "い"
      ) {
        spaceCounter = 0;
        subtemp = subtemp + arr[i][j];
        english = subtemp;
        subtemp = "";
      } else if (arr[i][j] === "い") {
        hsk1Array = finalArray;
        console.log("HSK1 wordlist loaded");
        finalArray = [];
      } else if (arr[i][j] === "に") {
        hsk2Array = finalArray;
        console.log("HSK2 wordlist loaded");
        finalArray = [];
      } else if (arr[i][j] === "さ") {
        hsk3Array = finalArray;
        console.log("HSK3 wordlist loaded");
        finalArray = [];
      } else if (arr[i][j] === "し") {
        hsk4Array = finalArray;
        console.log("HSK4 wordlist loaded");
        finalArray = [];
      } else if (arr[i][j] === "ご") {
        hsk5Array = finalArray;
        console.log("HSK5 wordlist loaded");
        finalArray = [];
      } else if (arr[i][j] === "ろ") {
        hsk6Array = finalArray;
        console.log("HSK6 wordlist loaded");
      } else {
        subtemp = subtemp + arr[i][j];
      }
    }
  }
  // hsk6Array = finalArray;
  console.log(
    "wordlist sizes: ",
    hsk1Array.length,
    hsk2Array.length,
    hsk3Array.length,
    hsk4Array.length,
    hsk5Array.length,
    hsk6Array.length
  );
  // console.log("HSK6 wordlist loaded");
}

//radio butttons and startup data.

let level = 1;
let heldHan = "欢迎!";
let heldPin = "huān yíng!";
let heldEng = "Welcome!";

function setLevel1() {
  level = 1;
  document.getElementById("lvldisplay").innerHTML =
    "HSK LEVEL: 1 &nbsp &nbsp 汉语水平考试 （一级）";
  document.getElementById("lvldisplay2").innerHTML =
    "HSK LEVEL: 1 &nbsp &nbsp 汉语水平考试 （一级）";
  document.getElementById("lvldisplay3").innerHTML =
    "HSK LEVEL: 1 &nbsp &nbsp 汉语水平考试 （一级）";
}

function setLevel2() {
  level = 2;
  document.getElementById("lvldisplay").innerHTML =
    "HSK LEVEL: 2 &nbsp &nbsp 汉语水平考试 （二级）";
  document.getElementById("lvldisplay2").innerHTML =
    "HSK LEVEL: 2 &nbsp &nbsp 汉语水平考试 （二级）";
  document.getElementById("lvldisplay3").innerHTML =
    "HSK LEVEL: 2 &nbsp &nbsp 汉语水平考试 （二级）";
}

function setLevel3() {
  level = 3;
  document.getElementById("lvldisplay").innerHTML =
    "HSK LEVEL: 3 &nbsp &nbsp 汉语水平考试 （三级）";
  document.getElementById("lvldisplay2").innerHTML =
    "HSK LEVEL: 3 &nbsp &nbsp 汉语水平考试 （三级）";
  document.getElementById("lvldisplay3").innerHTML =
    "HSK LEVEL: 3 &nbsp &nbsp 汉语水平考试 （三级）";
}

function setLevel4() {
  level = 4;
  document.getElementById("lvldisplay").innerHTML =
    "HSK LEVEL: 4 &nbsp &nbsp 汉语水平考试 （四级）";
  document.getElementById("lvldisplay2").innerHTML =
    "HSK LEVEL: 4 &nbsp &nbsp 汉语水平考试 （四级）";
  document.getElementById("lvldisplay3").innerHTML =
    "HSK LEVEL: 4 &nbsp &nbsp 汉语水平考试 （四级）";
}

function setLevel5() {
  level = 5;
  document.getElementById("lvldisplay").innerHTML =
    "HSK LEVEL: 5 &nbsp &nbsp 汉语水平考试 （五级）";
  document.getElementById("lvldisplay2").innerHTML =
    "HSK LEVEL: 5 &nbsp &nbsp 汉语水平考试 （五级）";
  document.getElementById("lvldisplay3").innerHTML =
    "HSK LEVEL: 5 &nbsp &nbsp 汉语水平考试 （五级）";
}

function setLevel6() {
  level = 6;
  document.getElementById("lvldisplay").innerHTML =
    "HSK LEVEL: 6 &nbsp &nbsp 汉语水平考试 （六级）";
  document.getElementById("lvldisplay2").innerHTML =
    "HSK LEVEL: 6 &nbsp &nbsp 汉语水平考试 （六级）";
  document.getElementById("lvldisplay3").innerHTML =
    "HSK LEVEL: 6 &nbsp &nbsp 汉语水平考试 （六级）";
}

//currently essentially unused. System needs a hash code generator for the tests.
let codeBox = [];
let hashCode = 0;

//generates a random character.

function randomCharacter() {
  document.getElementById("pindisplay").classList.remove("pressed");
  document.getElementById("pindisplay").classList.remove("unpressed");
  document.getElementById("pindisplay").classList.add("unpressed");
  document.getElementById("engdisplay").classList.remove("pressed2");
  document.getElementById("engdisplay").classList.remove("unpressed");
  document.getElementById("engdisplay").classList.add("unpressed");

  if (level === 1) {
    let randomNumber = Math.floor(Math.random() * hsk1Array.length - 1);
    if (randomNumber < 0) {
      randomNumber = 1;
    }
    if (hsk1Array[randomNumber].length === 3) {
      setFlashcardPick(hsk1Array, randomNumber);
    } else {
      console.log("error");
    }
  } else if (level === 2) {
    let randomNumber = Math.floor(Math.random() * hsk2Array.length - 1);
    if (randomNumber < 0) {
      randomNumber = 1;
    }
    setFlashcardPick(hsk2Array, randomNumber);
  } else if (level === 3) {
    let randomNumber = Math.floor(Math.random() * hsk3Array.length - 1);
    if (randomNumber < 0) {
      randomNumber = 1;
    }
    setFlashcardPick(hsk3Array, randomNumber);
  } else if (level === 4) {
    let randomNumber = Math.floor(Math.random() * hsk4Array.length - 1);
    if (randomNumber < 0) {
      randomNumber = 1;
    }
    setFlashcardPick(hsk4Array, randomNumber);
  } else if (level === 5) {
    let randomNumber = Math.floor(Math.random() * hsk5Array.length - 1);
    if (randomNumber < 0) {
      randomNumber = 1;
    }
    setFlashcardPick(hsk5Array, randomNumber);
  } else if (level === 6) {
    let randomNumber = Math.floor(Math.random() * hsk6Array.length - 1);
    if (randomNumber < 0) {
      randomNumber = 1;
    }
    setFlashcardPick(hsk6Array, randomNumber);
  } else {
    console.log("error");
  }
  document.getElementById("handisplay").innerHTML = heldHan;
  document.getElementById("pindisplay").innerHTML = "Pinyin";
  document.getElementById("engdisplay").innerHTML = "English";
  if (codeBox.length > 200) {
    codeBox = [];
  }
}

//builds the flashcard
function setFlashcardPick(arr, num) {
  heldHan = arr[num][0];
  heldPin = arr[num][1];
  heldEng = arr[num][2];
  console.log(num, heldHan, heldPin, heldEng);
  codeBox.push(num);
}

// these functions govern the pinyin / english reveal buttons.

function showPinyin() {
  document.getElementById("pindisplay").classList.remove("pressed");
  document.getElementById("pindisplay").classList.remove("unpressed");
  document.getElementById("pindisplay").classList.add("pressed");
  document.getElementById("pindisplay").innerHTML = heldPin;
}

function showEnglish() {
  document.getElementById("engdisplay").innerHTML = heldEng;
  document.getElementById("engdisplay").classList.remove("pressed2");
  document.getElementById("engdisplay").classList.remove("unpressed");
  document.getElementById("engdisplay").classList.add("pressed2");
}

//exam generators.

let twentyWordExam = [];
let hundredWordExam = [];
let currentExam;

//generate 20-word and 100-word exams and sets 'current exam' to them.

function genTwenty() {
  twentyWordExam = [];
  randomCharacter();
  let doubled = false;
  twentyWordExam.push([heldHan, heldPin, heldEng]);
  while (twentyWordExam.length < 20) {
    doubled = false;
    randomCharacter();
    for (let i = 0; i < twentyWordExam.length; i++) {
      if (heldHan === twentyWordExam[i][0]) {
        doubled = true;
      }
    }
    if (doubled === false) {
      twentyWordExam.push([heldHan, heldPin, heldEng]);
    } else {
      console.log("reroll");
      randomCharacter();
      doubled = false;
    }
  }
  console.log("Test built succesfully");
  currentExam = twentyWordExam;
  windowOpener();
  codeBox = [];
  hashCode = 0;
}

//actually generates 44, leaving as-is for now.
function genHundred() {
  hundredWordExam = [];
  randomCharacter();
  let doubled = false;
  hundredWordExam.push([heldHan, heldPin, heldEng]);
  while (hundredWordExam.length < 44) {
    doubled = false;
    randomCharacter();
    for (let i = 0; i < hundredWordExam.length; i++) {
      if (heldHan === hundredWordExam[i][0]) {
        doubled = true;
      }
    }
    if (doubled === false) {
      hundredWordExam.push([heldHan, heldPin, heldEng]);
    } else {
      console.log("reroll");
      randomCharacter();
      doubled = false;
    }
  }
  console.log("Test built succesfully");
  currentExam = hundredWordExam;
  windowOpener();
  codeBox = [];
  hashCode = 0;
}

// opens a window with the test.

function windowOpener() {
  codeGenerator();
  testCleaner();
  var myWindow = window.open("", "MsgWindow", "width=563,height=750");
  myWindow.document.write("");
  myWindow.document.write(currentExam.toString());
  console.log("Test Code: " + hashCode);
}

//generates the html for an exam paper and the answers.

function testCleaner() {
  let html = "";
  let size = currentExam.length;
  let category;
  let leftIndent = 0;
  if (size < 100) {
    category = "small";
  } else {
    category = "large";
  }
  let row = "";
  let items = 0;
  html =
    html +
    hashCode +
    "&#12288;" +
    "&#12288;" +
    "&#12288;" +
    "Student Name: " +
    "&#12288;" +
    "&#12288;" +
    "&#12288;" +
    "&#12288;" +
    "&#12288;" +
    "&#12288;" +
    "&#12288;" +
    "&#12288;" +
    "&#12288;" +
    "&#12288;" +
    "Date: " +
    "&#12288;" +
    "&#12288;" +
    "&#12288;";
  html = html + "&#12288;" + "&#12288;" + "&#12288;";
  if (level === 1) {
    html = html + "HSK Level 1";
  } else if (level === 2) {
    html = html + "HSK Level 2";
  } else if (level === 3) {
    html = html + "HSK Level 3";
  } else if (level === 4) {
    html = html + "HSK Level 4";
  } else if (level === 5) {
    html = html + "HSK Level 5";
  } else if (level === 6) {
    html = html + "HSK Level 6";
  }
  html = html + "<br></br>";
  html = html + "<br></br>";

  for (let i = 0; i < size; i++) {
    if (items === 0) {
      items = items + 1;
      row = row + "&#12288;";
      row = row + "&nbsp" + "&nbsp" + (i + 1) + ".";
      if (category === "small" && i + 1 < 10) {
        row = row + "&nbsp" + "&nbsp";
      } else if (category === "large" && i + 1 < 10) {
        row = row + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp";
      } else if (category === "large" && i + 1 < 100) {
        row = row + "&nbsp" + "&nbsp";
      }
      row = row + "&#12288;" + currentExam[i][0] + ":";
      leftIndent = 4 - currentExam[i][0].length;
      for (let n = 0; n < leftIndent; n++) {
        row = row + "&#12288;";
      }
    } else {
      items = 0;
      indent = leftIndent - currentExam[i][0].length;
      for (let j = 0; j < 10; j++) {
        row = row + "&#12288;";
      }

      row =
        row +
        "&nbsp" +
        "&nbsp" +
        "&nbsp" +
        "&nbsp" +
        "&nbsp" +
        "&nbsp" +
        "&nbsp" +
        (i + 1) +
        ".";
      if (category === "small" && i + 1 < 10) {
        row = row + "&nbsp" + "&nbsp";
      } else if (category === "large" && i + 1 < 10) {
        row = row + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp";
      } else if (category === "large" && i + 1 < 100) {
        row = row + "&nbsp" + "&nbsp";
      }
      row = row + "&#12288;" + currentExam[i][0] + ":";
      row = row + "<br></br>";
      html = html + row;
      row = "";
    }
  }
  html = html + "<br></br>";
  html =
    html +
    hashCode +
    "&nbsp" +
    "&#12288;" +
    "&#12288;" +
    "answersheet" +
    "&#12288;" +
    "&#12288;" +
    "&#12288;" +
    "feedback: james.stonelunde@gmail.com";
  html = html + "<br></br>";
  for (let i = 0; i < size; i++) {
    if (items === 0) {
      items = items + 1;
      row = row + "&#12288;";
      row = row + "&nbsp" + (i + 1) + ".";
      if (category === "small" && i + 1 < 10) {
        row = row + "&nbsp" + "&nbsp";
      } else if (category === "large" && i + 1 < 10) {
        row = row + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp";
      } else if (category === "large" && i + 1 < 100) {
        row = row + "&nbsp" + "&nbsp";
      }
      row =
        row +
        "&#12288;" +
        currentExam[i][0] +
        "&#12288;" +
        currentExam[i][1] +
        ", " +
        "&nbsp" +
        "&nbsp" +
        currentExam[i][2];
      leftIndent = 4 - currentExam[i][0].length;
    } else {
      items = 0;
      indent = leftIndent - currentExam[i][0].length;
      for (let j = 0; j < 2; j++) {
        row = row + "&#12288;";
      }

      row = row + "&nbsp" + (i + 1) + ".";
      if (category === "small" && i + 1 < 10) {
        row = row + "&nbsp" + "&nbsp";
      } else if (category === "large" && i + 1 < 10) {
        row = row + "&nbsp" + "&nbsp" + "&nbsp" + "&nbsp";
      } else if (category === "large" && i + 1 < 100) {
        row = row + "&nbsp" + "&nbsp";
      }
      row =
        row +
        "&#12288;" +
        currentExam[i][0] +
        "&#12288;" +
        currentExam[i][1] +
        ", " +
        "&nbsp" +
        "&nbsp" +
        currentExam[i][2];
      row = row + "<br></br>";
      html = html + row;
      row = "";
    }
  }
  currentExam = html;
}

//unique test code generator.(nonreversible, not a real hash, just an ID)
function codeGenerator() {
  hashCode = "L" + level.toString();
  let tempVal = Math.floor(Math.random() * 100000);
  if (codeBox.length < 45) {
    hashCode = hashCode + "S";
  } else {
    hashCode = hashCode + "B";
  }
  hashCode = hashCode + tempVal.toString();
  let randomizer = Math.floor(randomNumber(0, hsk6Array.length));
  hashCode = hashCode + hsk6Array[randomizer][0][0];
}

//generates a random number between two limits
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

//in-browser test.

let answersInputNumber = 0;
let testSize = 10;
let correctAnswers = 0;
let incorrectAnswers = 0;
let letterGrade = "";
let confirmCounter = 0;
let inputBox = document.getElementById("inputpinyin");
let instructionsToggle = 0;
let testType = "pinyin";
let pinyinSubmissionsArray = [];
let toneNumbersArray = [];
let toneNumbersTracker = 0;

function setLengthTen() {
  testSize = 10;
}
function setLengthTwenty() {
  testSize = 20;
}
function setLengthFifty() {
  testSize = 50;
}
function setLengthHundred() {
  testSize = 100;
}

//start bug-prone section (specifically, data from the following three functions
// frequently overlaps/carries over weirdly. Make sure to clear and reset all the
// wayward HTML in this section.)

// takes you to the test page by disabling superdiv and enabling testdiv
function onlineTestLarge() {
  if (testType === "honour") {
    currentLocation = "honourTest";
    answersInputNumber = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    confirmCounter = 0;
    instructionsToggle = 1;
    revealInstructions();
    randomCharacter();
    setRadioButtons();
    setQuestionValue();
    pinyinSubmissionsArray = [];
    toneNumbersArray = [];
    toneNumbersTracker = 0;
    document.getElementById("examdisplay").innerHTML = heldHan;
    document.getElementById("testdiv").style = "display:block";
    document.getElementById("superdiv").style = "display:none";
    document.getElementById("testmenudiv").style = "display:none";
    document.getElementById("pintestdiv").style = "display:none";
    hideTest();
    document.getElementById("revealtest").disabled = false;
    document.getElementById("revealtest").innerHTML = "Show Pinyin and English";
  } else if (testType === "pinyin") {
    currentLocation = "pinyinTest";
    document.getElementById("pinyininputboxes").style = "display:flex";
    document.getElementById("pinyinresultstable").style = "display:none";
    document.getElementById("pinexamdisplay").style = "display:flex";
    answersInputNumber = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    confirmCounter = 0;
    toneNumbersArray = [];
    toneNumbersTracker = 0;
    instructionsToggle = 1;
    revealInstructions();
    randomCharacter();
    setRadioButtons();
    setQuestionValue();
    pinyinSubmissionsArray = [];
    document.getElementById("pinscore").innerHTML =
      "Question: &nbsp" + answersInputNumber + "/" + testSize;
    document.getElementById("pinexamdisplay").innerHTML = heldHan;
    document.getElementById("testdiv").style = "display:none";
    document.getElementById("superdiv").style = "display:none";
    document.getElementById("testmenudiv").style = "display:none";
    document.getElementById("pintestdiv").style = "display:block";
    hideTestPinyin();
    inputBox.value = "";
    inputBox.focus();
    inputBox.select();
  }
}

//takes you to the test menu page by disabling testdiv and superdiv and enabling testmenudiv
function onlineTestMenu() {
  currentLocation = "testMenu";
  setRadioButtons();
  hideTestPinyin();
  instructionsToggle = 1;
  revealInstructions();
  pinyinSubmissionsArray = [];
  toneNumbersArray = [];
  toneNumbersTracker = 0;
  document.getElementById("testdiv").style = "display:none";
  document.getElementById("testmenudiv").style = "display:block";
  document.getElementById("superdiv").style = "display:none";
  document.getElementById("pintestdiv").style = "display:none";
  hideTest();
  document.getElementById("revealtest").disabled = false;
  document.getElementById("revealtest").innerHTML = "Show Pinyin and English";
}

// returns to home menu by disabling testdiv and enabling superdiv.
function exit() {
  currentLocation = "homepage";
  answersInputNumber = 0;
  confirmCounter = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  answersInputNumber = 0;
  instructionsToggle = 1;
  toneNumbersArray = [];
  toneNumbersTracker = 0;
  revealInstructions();
  setRadioButtons();
  hideTestPinyin();
  pinyinSubmissionsArray = [];
  document.getElementById("testdiv").style = "display:none";
  document.getElementById("superdiv").style = "display:block";
  document.getElementById("testmenudiv").style = "display:none";
  document.getElementById("pintestdiv").style = "display:none";
  setQuestionValue();
  hideTest();
  document.getElementById("revealtest").disabled = false;
  document.getElementById("revealtest").innerHTML = "Show Pinyin and English";
}

//reveals the test.
function revealTest() {
  document.getElementById("revealtest").style = "display:none";
  document.getElementById("known").style = "display:block";
  document.getElementById("unknown").style = "display:block";
  showTestPinyin();
}

//conceals the test.
function hideTest() {
  document.getElementById("revealtest").style = "display:block";
  document.getElementById("known").style = "display:none";
  document.getElementById("unknown").style = "display:none";
  hideTestPinyin();
}

//used in honour test, declares a word to be known.
function known() {
  if (answersInputNumber < testSize - 1) {
    randomCharacter();
    document.getElementById("examdisplay").innerHTML = heldHan;
    answersInputNumber = answersInputNumber + 1;
    correctAnswers = correctAnswers + 1;
    setQuestionValue();
    hideTest();
  } else if (answersInputNumber === testSize - 1) {
    answersInputNumber = answersInputNumber + 1;
    correctAnswers = correctAnswers + 1;
    setQuestionValue();
    showTestPinyin();
    publishResults();
    disableTestButtons();
  } else {
    publishResults();
    showTestPinyin();
    disableTestButtons();
  }
}

//used in honour test, declares a word to be unknown.
function unknown() {
  if (answersInputNumber < testSize - 1) {
    randomCharacter();
    document.getElementById("examdisplay").innerHTML = heldHan;
    answersInputNumber = answersInputNumber + 1;
    incorrectAnswers = incorrectAnswers + 1;
    setQuestionValue();
    hideTest();
  } else if (answersInputNumber === testSize - 1) {
    answersInputNumber = answersInputNumber + 1;
    incorrectAnswers = incorrectAnswers + 1;
    setQuestionValue();
    showTestPinyin();
    publishResults();
    disableTestButtons();
  } else {
    publishResults();
    showTestPinyin();
    disableTestButtons();
  }
}

//resets radio buttons to the appropriate level
function setRadioButtons() {
  if (level === 1) {
    document.getElementById("radio1").checked = true;
    document.getElementById("testradio1").checked = true;
  } else if (level === 2) {
    document.getElementById("radio2").checked = true;
    document.getElementById("testradio2").checked = true;
  } else if (level === 3) {
    document.getElementById("radio3").checked = true;
    document.getElementById("testradio3").checked = true;
  } else if (level === 4) {
    document.getElementById("radio4").checked = true;
    document.getElementById("testradio4").checked = true;
  } else if (level === 5) {
    document.getElementById("radio5").checked = true;
    document.getElementById("testradio5").checked = true;
  } else if (level === 6) {
    document.getElementById("radio6").checked = true;
    document.getElementById("testradio6").checked = true;
  }
}

//sets the inside of the questions/test size element.
function setQuestionValue() {
  document.getElementById("score").innerHTML =
    "Question: &nbsp" + answersInputNumber + "/" + testSize;
}

//reveals test results. Place test result saving function here.
function publishResults() {
  console.log("Your score: " + correctAnswers + "/" + testSize);
  letterGradeCalculator();
  document.getElementById("score").innerHTML =
    "Question: &nbsp" + answersInputNumber + "/" + testSize;
}

//takes a number between 0 and 1 and converts it to a letter grade.
function getLetterGradeGivenScore(score) {
  if (score === 1) {
    return "(A+)";
  } else if (score > 0.89) {
    return "(A)";
  } else if (score > 0.79) {
    return "(B)";
  } else if (score > 0.69) {
    return "(C)";
  } else if (score > 0.59) {
    return "(D)";
  } else {
    return "(F)";
  }
}

let legacyLetterGrade = "";

//calculates letter grade, and also manages cookies.
//this code generates two cookies, 'testnumber' (the # of tests taken by the user)
// and 'historicscore' (the average % score of those tests.)
//depends on cookiePermission being true.
function letterGradeCalculator() {
  let numberOfTestsTaken;
  let historicPercentage;
  // if (cookiePermission) {
  //   numberOfTestsTaken = +Cookies.get("testNumber") || 0;
  // }
  // numberOfTestsTaken = numberOfTestsTaken + 1;
  // if (cookiePermission) {
  //   historicPercentage = +Cookies.get("historicScore") || 0;
  // }
  let percentageResult = correctAnswers / testSize;
  let prov = historicPercentage * (numberOfTestsTaken - 1) + percentageResult;
  // if (cookiePermission) {
  //   console.log(prov);
  // }
  prov = prov / numberOfTestsTaken;
  // if (cookiePermission) {
  //   Cookies.set("historicScore", prov);
  //   Cookies.set("testNumber", numberOfTestsTaken);
  // }
  // console.log(Cookies.get("testNumber"), Cookies.get("historicScore"));
  letterGrade = getLetterGradeGivenScore(correctAnswers / testSize);
  legacyLetterGrade = getLetterGradeGivenScore(prov);
}

//reveals the pinyin for current test word.
function showTestPinyin() {
  document.getElementById("testpinyin").innerHTML =
    heldPin + "&nbsp" + "&nbsp" + "[" + "&nbsp" + heldEng + "]";
}

//hides the pinyin for current test word.
function hideTestPinyin() {
  document.getElementById("testpinyin").innerHTML = "&nbsp";
}

// blanks the testbutton
function disableTestButtons() {
  document.getElementById("revealtest").style = "display:block";
  document.getElementById("known").style = "display:none";
  document.getElementById("unknown").style = "display:none";
  showTestPinyin();
  document.getElementById("revealtest").disabled = true;
  // if (cookiePermission) {
  //   document.getElementById("revealtest").innerHTML =
  //     "Your grade: &nbsp" +
  //     correctAnswers +
  //     "/" +
  //     testSize +
  //     "&nbsp" +
  //     letterGrade +
  //     "<br>" +
  //     "Your average grade: &nbsp" +
  //     legacyLetterGrade;
  // }else {
  document.getElementById("revealtest").innerHTML =
    "Your grade: &nbsp" +
    correctAnswers +
    "/" +
    testSize +
    "&nbsp" +
    letterGrade;
}
// }

// test type set.
function setTestTypePinyin() {
  console.log("pinyin");
  testType = "pinyin";
}
function setTestTypeHonour() {
  console.log("honour");
  testType = "honour";
}

//this button submits the user guess for pinyin tests.
function submitPinyin() {
  if (answersInputNumber < testSize) {
    let submission = inputBox.value;
    if (submission.length > 0) {
      inputBox.value = "";
      inputBox.focus();
      inputBox.select();
      pinyinSubmissionsArray.push([
        heldHan,
        submission.replace(/\s+/g, "").toLowerCase(),
        heldPin,
      ]);
      answersInputNumber = answersInputNumber + 1;
      document.getElementById("pinscore").innerHTML =
        "Question: &nbsp" + answersInputNumber + "/" + testSize;
      randomCharacter();
      let doubledChar = false;
      for (let i = 0; i < pinyinSubmissionsArray.length; i++) {
        if (pinyinSubmissionsArray[i][0] === heldHan) {
          doubledChar = true;
          console.log("reroll");
        }
      }
      while (doubledChar === true) {
        randomCharacter();
        let doubledChecker = 0;
        for (let i = 0; i < pinyinSubmissionsArray.length; i++) {
          if (pinyinSubmissionsArray[i][0] === heldHan) {
            doubledChecker = 1;
          }
        }
        if (doubledChecker === 1) {
          doubledChar = true;
        } else {
          doubledChar = false;
        }
      }
      document.getElementById("pinexamdisplay").innerHTML = heldHan;
    } else {
      inputBox.value = "please type pinyin here";
      inputBox.focus();
      inputBox.select();
    }
  } else {
    console.log("test over");
    gradePinyinTest(pinyinSubmissionsArray);
  }
}

//shows/hides the instruction panel for pinyin tests
function revealInstructions() {
  if (instructionsToggle === 0) {
    document.getElementById("instructions").style = style =
      "margin-left: 25%; margin-right:25%; font-size:24px; font-family: Arial, Helvetica, sans-serif; display:block;";
    instructionsToggle = 1;
  } else {
    instructionsToggle = 0;
    document.getElementById("instructions").style = style =
      "margin-left: 25%; margin-right:25%; font-size:24px; font-family: Arial, Helvetica, sans-serif; display:none;";
  }
}

let errorLog = [];

//grade the submitted exam.
function gradePinyinTest(arr) {
  errorLog = [];
  correctAnswers = 0;
  for (let i = 0; i < arr.length; i++) {
    if (pinyinMatch(arr[i][1], arr[i][2]) === true) {
      correctAnswers = correctAnswers + 1;
    } else {
      errorLog.push(arr[i][1], arr[i][2] + "(" + arr[i][0] + ")");
    }
  }
  letterGradeCalculator();
  console.log(letterGrade, correctAnswers + "/" + testSize);
  console.log(errorLog);
  endPinyinTest();
}

//checks to see if the user's input matches the correct pinyin.
function pinyinMatch(inputPinyin, correctPinyin) {
  //resets the tone tracking system.
  toneNumbersArray = [];
  toneNumbersTracker = 0;

  //all instances of correctpinyin must be changed to lowerCaseCorrect
  let lowerCaseCorrect = correctPinyin.toLowerCase();

  //build an array with all the user's input numbers.
  //we must alert the user not to input 0.
  for (let j = 0; j < inputPinyin.length; j++) {
    if (
      inputPinyin[j] === "1" ||
      inputPinyin[j] === "2" ||
      inputPinyin[j] === "3" ||
      inputPinyin[j] === "4"
    ) {
      toneNumbersArray.push(inputPinyin[j]);
    }
  }

  //need to remove all numbers from the inputPinyin String.
  let numberLessInput = inputPinyin.replace(/[0-4]/g, "");

  // check and see if they're the exact same.
  if (numberLessInput === lowerCaseCorrect) {
    return true;
  }
  // check and see if they're the exact same length (if not, can't be a match)
  else if (numberLessInput.length != lowerCaseCorrect.length) {
    return false;
  } else {
    //check it character-for-character.
    let errorsDetected = 0;
    for (let i = 0; i < numberLessInput.length; i++) {
      let inputChar = numberLessInput[i];
      let correctChar = lowerCaseCorrect[i];
      if (inputChar === correctChar) {
        //characters match. no need to do anything.
      } else {
        // check and see that it's a consonant.
        if (/[bcdfghjklmnpqrstvwxys]/gi.test(inputChar)) {
          //both are consonants, but they don't match. User input is wrong.
          return false;
        } else {
          //user input is a vowel, but doesn't match the correct pinyin.
          //first let's set the accentless pinyin.
          let accentlessPinyin;
          if (
            correctChar === "ā" ||
            correctChar === "á" ||
            correctChar === "à" ||
            correctChar === "ǎ" ||
            correctChar === "a"
          ) {
            accentlessPinyin = "a";
          }
          if (
            correctChar === "ī" ||
            correctChar === "í" ||
            correctChar === "ǐ" ||
            correctChar === "ì" ||
            correctChar === "i"
          ) {
            accentlessPinyin = "i";
          }
          if (
            correctChar === "ū" ||
            correctChar === "ú" ||
            correctChar === "ǔ" ||
            correctChar === "ù" ||
            correctChar === "ü" ||
            correctChar === "ǘ" ||
            correctChar === "ǚ" ||
            correctChar === "ǜ" ||
            correctChar === "u"
          ) {
            accentlessPinyin = "u";
          }
          if (
            correctChar === "ō" ||
            correctChar === "ó" ||
            correctChar === "ǒ" ||
            correctChar === "ò" ||
            correctChar === "o"
          ) {
            accentlessPinyin = "o";
          }
          if (
            correctChar === "ē" ||
            correctChar === "é" ||
            correctChar === "ě" ||
            correctChar === "è" ||
            correctChar === "e"
          ) {
            accentlessPinyin = "e";
          }
          if (accentlessPinyin != inputChar) {
            // the user did not input the correct vowel.
            return false;
          } else {
            //the user has input the correct vowel.
            //it is time to determine the accent.
            let tone;
            if (
              correctChar === "a" ||
              correctChar === "e" ||
              correctChar === "i" ||
              correctChar === "o" ||
              correctChar === "u" ||
              correctChar === "ü"
            ) {
              tone = "0";
            } else if (
              correctChar === "ā" ||
              correctChar === "ē" ||
              correctChar === "ī" ||
              correctChar === "ō" ||
              correctChar === "ū"
            ) {
              tone = "1";
            } else if (
              correctChar === "á" ||
              correctChar === "é" ||
              correctChar === "í" ||
              correctChar === "ó" ||
              correctChar === "ú" ||
              correctChar === "ǘ"
            ) {
              tone = "2";
            } else if (
              correctChar === "ǎ" ||
              correctChar === "ě" ||
              correctChar === "ǐ" ||
              correctChar === "ǒ" ||
              correctChar === "ǔ" ||
              correctChar === "ǚ"
            ) {
              tone = "3";
            } else if (
              correctChar === "à" ||
              correctChar === "è" ||
              correctChar === "ì" ||
              correctChar === "ò" ||
              correctChar === "ù" ||
              correctChar === "ǜ"
            ) {
              tone = "4";
            }
            //we have determined the tone. Now lets compare it to our records.
            if (toneNumbersArray[toneNumbersTracker] === tone) {
              toneNumbersTracker = toneNumbersTracker + 1;
              // it matches. move onto next tone.
            } else {
              return false;
              //the tone is incorrect.
            }
          }
        }
      }
    }
    if (errorsDetected > 1) {
      //catches any remaining exceptions, and returns an error.
      return false;
    } else {
      return true;
    }
  }
}

let curatedErrorLog = "";

//ends the pinyin test, hiding various elements and displaying results.
function endPinyinTest() {
  document.getElementById("pinyininputboxes").style = "display:none";
  document.getElementById("pinexamdisplay").style = "display:none";
  document.getElementById("pinyinresultstable").style =
    "display:flex; font-size:30px; text-align:center; font-family: Arial, Helvetica, sans-serif;";
  curateErrorLog();
  document.getElementById("pinyinresultstable").innerHTML = curatedErrorLog;
  curatedErrorLog = "";
}

//cleans up the data collected during your test for presentation.
function curateErrorLog() {
  curatedErrorLog = curatedErrorLog + "<table style=" + "width:100%" + ">";
  // if (cookiePermission) {
  //   curatedErrorLog =
  //     curatedErrorLog +
  //     "<caption>" +
  //     "your grade: &nbsp" +
  //     letterGrade +
  //     "&nbsp" +
  //     "&nbsp" +
  //     correctAnswers +
  //     "/" +
  //     testSize +
  //     "<br>" +
  //     "Your average grade: &nbsp" +
  //     legacyLetterGrade +
  //     "<br></br>" +
  //     "your errors: &nbsp" +
  //     "<br></br>" +
  //     "</caption>";
  // } else {
  curatedErrorLog =
    curatedErrorLog +
    "<caption>" +
    "your grade: &nbsp" +
    letterGrade +
    "&nbsp" +
    "&nbsp" +
    correctAnswers +
    "/" +
    testSize +
    "<br></br>" +
    "your errors: &nbsp" +
    "<br></br>" +
    "</caption>";
  // }
  curatedErrorLog = curatedErrorLog + "<tr>";
  curatedErrorLog =
    curatedErrorLog +
    "<th>submitted answer</th>" +
    "<th>correct answer</th>" +
    "</tr>";
  let alternator = 0;
  for (let i = 0; i < errorLog.length; i++) {
    if (alternator === 0) {
      alternator = 1;
      curatedErrorLog = curatedErrorLog + "<tr>";
      curatedErrorLog = curatedErrorLog + "<td>" + errorLog[i] + "</td>";
    } else {
      curatedErrorLog = curatedErrorLog + "<td>" + errorLog[i] + "</td>";
      curatedErrorLog = curatedErrorLog + "</tr>";
      alternator = 0;
    }
  }
  curatedErrorLog = curatedErrorLog + "</table>";
}

// //database test
// function testDatabase() {
//   fetch("/api/records")
//     .then((res) => res.json())
//     .then((str) => {
//       console.log(str[0].name);
//     });
// }

// Get the modals
var loginModal = document.getElementById("loginscreen");
var registerModal = document.getElementById("createaccountscreen");

// When the user clicks anywhere outside of the modals, close it
window.onclick = function (event) {
  if (event.target == loginModal || event.target == registerModal) {
    loginModal.style.display = "none";
    registerModal.style.display = "none";
  }
};

//click on the forgot password button
function forgotPassword() {
  console.log("You forgot!");
}

//click on the login button in the modal to submit the form (it's not a regular form submit)
function loginForm() {
  //this function should check the login name + password against the database.
  //if they match, log user in.
  let nameEl = document.getElementById("loginname");
  let passwordEl = document.getElementById("loginpassword");
  let name = nameEl.value;
  let password = passwordEl.value;
  if (name.length === 0) {
    nameEl.focus;
  } else if (password.length === 0) {
    passwordEl.focus;
  }
  // let remember = document.getElementById("remembermecheckbox").checked;
  // console.log(remember);
  console.log(name, password);
  document.getElementById("loginscreen").style.display = "none";
}

//click on the login button on the non-modal screen
function loginButton() {
  alert("not implemented yet");
  return;
  document.getElementById("loginscreen").style.display = "block";
  document.getElementById("loginname").focus();
}

//generates the account creation modal screen
function createAccountButton() {
  alert("not implemented yet");
  return;
  document.getElementById("createaccountscreen").style.display = "block";
  document.getElementById("createaccountname").focus();
}

//submits the create account form
function createAccount() {
  let username = document.getElementById("createaccountname").value;
  let password = document.getElementById("createaccountpassword").value;
  let passwordConfirmation = document.getElementById(
    "confirmcreateaccountpassword"
  ).value;
  if (password.length < 6) {
    console.log("password too short");
    //make this prompt visible to the user.
    password.focus;
    password.value = "";
    return;
  } else if (password === passwordConfirmation) {
    console.log(username, password);
    //check username for validity
    //compare username for doubled copies in database
    //if doubled copy exists, prompt user to try a new username
    //if username and password are kosher, create the account and push it to the database
    //check the model file to review the user card (includes stuff like tests taken etc.)
    //give the user a succesful creation message
    //change the top-right hand corner message to "logged in as XYZ"
  } else if (password != passwordConfirmation) {
    console.log("passwords don't match!");
    //make this prompt visible to the user
    password.focus;
    //make the focus actually work (it doesn't currently)
    password.value = "";
    passwordConfirmation = "";
  }
  document.getElementById("createaccountscreen").style.display = "none";
}

//applies a variety of changes to the site based on cookie permission status.
function cookieMods() {
  if (!cookiePermission) {
    document.getElementById("remembermecheckbox").disabled = "disabled";
    document.getElementById("rememberlabel").innerHTML = "<br></br>";
    console.log("cookies disabled: remember me function suspended");
  }
  if (cookiePermission) {
    let name = Cookies.get("name");
    let password = Cookies.get("password");
    document.getElementById("loginname").value = name;
    document.getElementById("loginpassword").value = password;
  }
}
