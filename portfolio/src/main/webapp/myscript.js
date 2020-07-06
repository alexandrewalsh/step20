// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Show random fact on page load
 */
const facts = [
  'I have been to Costa Rica',
  'This is my first internship',
  'I have 2 brothers',
  'My parents met in Wales',
  'I go to UCLA',
  'I have 1 sister',
  'I have visited a Google office',
  'My favorite color is green',
  'Baseball is my favorite sport',
  'I was born in the USA',
];

// correct answers of facts.
const ans = [
  // 1 for true, 0 for false
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
];

let currentFact =
    0;  // stores the array pos of the current fact being displayed

function firstFact() {  // eslint-line-disable no-unused-vars
  currentFact = Math.floor(Math.random() * facts.length);
  document.getElementById('fact-container').innerHTML = facts[currentFact];
}

/**
 * Responds based on whether "True" or "False" button is pressed
 */
function buttonPressed(truePressed) {  // eslint-line-disable no-unused-vars
  const factContainer = document.getElementById('fact-container');
  const answerContainer = document.getElementById('answer-container');

  // process current fact, display correct or incorrect based on which button
  // was pressed
  if (truePressed) {         // true was pressed
    if (ans[currentFact]) {  // correct answer is true
      answerContainer.innerText = 'correct!';
    } else {  // correct answer is false
      answerContainer.innerText = 'incorrect!';
    }
  } else {
    if (ans[currentFact]) {  // correct answer is true
      answerContainer.innerText = 'incorrect!';
    } else {  // correct answer is false
      answerContainer.innerText = 'correct!';
    }
  }

  // For new fact:
  // Pick a random fact.
  const lastFact = currentFact;
  do {
    currentFact = Math.floor(Math.random() * facts.length);
  } while (lastFact == currentFact);
  const fact = facts[currentFact];
  // Add it to the page.
  factContainer.innerText = fact;
}

function
getRandomQuoteUsingArrowFunctions() {  // eslint-line-disable no-unused-vars
  fetch('/random-quote').then((response) => (response.text())).then((quote) => {
    document.getElementById('quote-container').innerText = quote;
  });
}

function loadComments() {
  fetch('/data?number=3').then((response) => (response.json())).then((comments) => {
    var formattedJson = ''
    for (var i = 0; i < comments.length; i++) {
      formattedJson += comments[i] + '\n';
    }
    document.getElementById('json-container').innerText = formattedJson;
  });
}

/** Creates an element that represents a comment*/
function createCommElement(comment) {
  const commElement = document.createElement('li');
  commElement.className = 'comment';

  const titleElement = document.createElement('span');
  titleElement.innerText = comment.user - comment;

  commElement.appendChild(titleElement);
  return commElement;
}

/*
function getDataFromServlet() {  // eslint-line-disable no-unused-vars
  var formattedJson = "";
  fetch('/data').then((response) => (response.json())).then((json) => {
    for (var i = 0; i < json.length; i++) {
      formattedJson += json[i] + '\n';
    }
    document.getElementById('json-container').innerText = formattedJson;
  });
}

*/