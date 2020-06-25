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
var facts = [
    "Fact 1.",
    "Fact 2?",
    "Fact 3!"
];

//correct answers of facts.
var ans = [ //1 for true, 0 for false
    1,
    0,
    1
]

var currentFact;    //stores the array pos of the current fact being displayed

function firstFact() {
    currentFact = Math.floor(Math.random() * facts.length);
    document.getElementById('fact-container').innerHTML = facts[currentFact];
}

/**
 * Responds based on whether "True" or "False" button is pressed
 */
function tfPressed(tf) {
    const factContainer = document.getElementById('fact-container');
    const answerContainer = document.getElementById('answer-container');

    //process current fact, display correct or incorrect based on which button was pressed
    if (tf) //true was pressed
    {
        
        if(ans[currentFact]) {  //correct answer is true
        
            
            answerContainer.innerText = "correct!";
        }
        else {                  //correct answer is false
            answerContainer.innerText = "incorrect!";
        }
    }
    else
    {
        if(ans[currentFact]) {  //correct answer is true
        
            
            answerContainer.innerText = "incorrect!";
        }
        else {                  //correct answer is false
            answerContainer.innerText = "correct!";
        }
    }

    //For new fact: 
        // Pick a random fact.
    currentFact = Math.floor(Math.random() * facts.length);
    const fact = facts[currentFact];
        // Add it to the page.
    factContainer.innerText = fact;

}
