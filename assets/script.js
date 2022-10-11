


var timeEl = document.querySelector(".time");
var secondsLeft = 60;

var score = 0; //set score to 0
/*var total = 4; //total nmumber of questions*/
/*var point = 1; //points per correct answer*/
/*var highest = total * point;*/

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = "Time left: "+ secondsLeft;

      if(secondsLeft > 0){
        stop(timerInterval)

      }
     
      else if(secondsLeft === 0){ 
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        /*// Calls function to create and append image
        sendMessage("Your Score = " + secondsLeft);*/
      }
    
    }, 1000);
  }
  setTime();



  window.onload = function () {
  
    var questionArea = document.getElementsByClassName('questions')[0],
        answerArea   = document.getElementsByClassName('answers')[0],
        checker      = document.getElementsByClassName('checker')[0],
        current      = 0,
    
       // An object that holds all the questions + possible answers.
       // In the array --> last digit gives the right answer position
        allQuestions = {

          'How do you write "Hello World" in an alert box?' : ['msgBox("Hello World");', 'alert("Hello World");', 'alertBox(Hello World");', 'msg("Hello World");', 1],
          
          'Which event occurs when the user clicks on an HTML element?' : ['onclick', 'onmouseover', 'onmouseclick','onmouseover', 0],
       
          'How do you create a function in JavaScript?' : ['function:myFunction()', 'function myFunction()', 'function = myFunction()','None of the above', 1],

          'Where is the correct place to insert a JavaScript?' : ['The <head> section', 'Both the <head> section and the <body> section are correct', 'The <body> section', 'None of the above', 1],

          'What is the correct way to write a JavaScript array?' : ['var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', 'var colors = "red", "green", "blue"', 'var colors = ["red", "green", "blue"]', 'var colors = (1:"red", 2:"green", 3:"blue")', 2]
        };
        
    function loadQuestion(curr) {
    // This function loads all the question into the questionArea
    // It grabs the current question based on the 'current'-variable
    
      var question = Object.keys(allQuestions)[curr];
      
      questionArea.innerHTML = '';
      questionArea.innerHTML = question;    
    }
    
    function loadAnswers(curr) {
    // This function loads all the possible answers of the given question
    // It grabs the needed answer-array with the help of the current-variable
    // Every answer is added with an 'onclick'-function
    
      var answers = allQuestions[Object.keys(allQuestions)[curr]];
      
      answerArea.innerHTML = '';
      
      for (var i = 0; i < answers.length -1; i += 1) {
        var createDiv = document.createElement('div'),
            text = document.createTextNode(answers[i]);
        
        createDiv.appendChild(text);      
        createDiv.addEventListener("click", checkAnswer(i, answers));
        
        
        answerArea.appendChild(createDiv);
      }
    }
    
    function checkAnswer(i, arr) {
      // This is the function that will run, when clicked on one of the answers
      // Check if givenAnswer is same as the correct one
      // After this, check if it's the last question:
      // If it is: empty the answerArea and let them know it's done.
      
      return function () {
        var givenAnswer = i,
            correctAnswer = arr[arr.length-1];
        
        if (givenAnswer === correctAnswer) {
          addChecker(true);             
        } else {
          addChecker(false);                        
        }
        
        if (current < Object.keys(allQuestions).length -1) {
          current += 1;
          
          loadQuestion(current);
          loadAnswers(current);
        } else {
          questionArea.innerHTML = 'Done';
          answerArea.innerHTML = '';
        }
                                
      };
    }
    
    function addChecker(bool) {
    // This function adds a div element to the page
    // Used to see if it was correct or false
    
      var createDiv = document.createElement('div');
         txt       = document.createTextNode(current + 1);  
      
      createDiv.appendChild(txt);
      
      
      if (bool) {
  
        createDiv.className += 'correct';
        checker.appendChild(createDiv);
       
      } else {
        createDiv.className += 'false';
        checker.appendChild(createDiv);
      }
    }
    


    
    // Start the quiz right away
    loadQuestion(current);
    loadAnswers(current);
    
  };