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

/** Show random fact on page load */
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

// variable to store the number of comments to load, default 10
let commentCount = 10;

// stores the array pos of the current fact being displayed
let currentFact = 0;

/** function to display the first fact upon loading the html page in */
function firstFact() {  // eslint-line-disable no-unused-vars
  currentFact = Math.floor(Math.random() * facts.length);
  document.getElementById('fact-container').innerHTML = facts[currentFact];
}

/** Responds based on whether "True" or "False" button is pressed */
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

/**
 * fetches a random quotes from the RandomQuoteServlet, and displays it on the
 * portfolio
 */
function
getRandomQuoteUsingArrowFunctions() {  // eslint-line-disable no-unused-vars
  fetch('/random-quote').then((response) => (response.text())).then((quote) => {
    document.getElementById('quote-container').innerText = quote;
  });
}

/**
 * calls the DataServlet to load in the correct number of comments from the GCP
 * database
 */
function loadComments() {
  const fetchValue = '/data?number=' + commentCount;
  fetch(fetchValue).then((response) => (response.json())).then((comments) => {
    let formattedJson = '';
    for (let i = 0; i < comments.length; i++) {
      formattedJson += comments[i] + '\n';
    }
    document.getElementById('json-container').innerText = formattedJson;
  });
}

/**
 * changes the global variable that controls how many comments are displayed on
 * the portfolio
 */
function changeNumberOfCommentsDisplayed(value) {
  commentCount = value;
  loadComments();
}

/** Creates an element that represents a comment */
function createCommElement(comment) {
  const commElement = document.createElement('li');
  commElement.className = 'comment';

  const titleElement = document.createElement('span');
  titleElement.innerText = comment.user - comment;

  commElement.appendChild(titleElement);
  return commElement;
}

/** Tab switching */
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

function setFormUrl() {
  fetch('/blobstore-upload-url')
      .then((response) => {
        return response.text();
      })
      .then((imageUploadUrl) => {
        const messageForm = document.getElementById('imageForm');
        messageForm.action = imageUploadUrl;
        messageForm.classList.remove('hidden');
      });
}

function start() {
  loadComments();
  setFormUrl();
}


/************************************************* */
/*      Functions for capstone                     */
/************************************************* */

/**
 * display database info
 */
function loadURLs() {
  const fetchValue = '/url?number=' + commentCount;
  fetch(fetchValue).then((response) => (response.json())).then((comments) => {
    let formattedJson = '';
    for (let i = 0; i < comments.length; i++) {
      formattedJson += comments[i] + '\n';
    }
    document.getElementById('json-container2').innerText = formattedJson;
  });
}

/**
 * iframe:
 */
// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'GltlJO56S1g',
    events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}
  });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(seekVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
function seekVideo() {
    player.playVideo();
    player.seekTo(60, true);
}
