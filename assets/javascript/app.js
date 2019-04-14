$(document).ready(function() {
    console.log("ready to go");
    // var options = [{
    //         question: "Capital of Illinois",
    //         choice: ["Springfield", "Chicago", "Blue Island", "Harvey"],
    //         answer: 0,
    //         photo: "assets/images/herring.jpg"
    //     },
    //     {
    //         question: "Capital of Jamaica",
    //         choice: ["Bronx", "Kingston", "Spanish Town", "St Ann"],
    //         answer: 1,
    //         photo: "assets/images/lemon.gif"
    //     },
    //     {
    //         question: "Capital of England?",
    //         choice: ["Bristol", "Livepool", "London", "Jamaica"],
    //         answer: 2,
    //         photo: "assets/images/guava.gif"
    //     }
    // ];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 5;
    var intervalId;
    var userGuess = "";
    // var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var alreadyAsked = [];

    //------------------------------------------------------------------------//    
    var init = function() {
            console.clear();
            console.log("initialize");
            $("#start").hide();
            displayQuestion();
            timerO.start();
            for (var i = 0; i < options.length; i++) {
                alreadyAsked.push(options[i]);
            }
        }
        //------------------------------------------------------------------------//    

    $("#reset").hide();

    $("#start").on("click", function() {
        console.log("starting game");
        $("#start").hide();
        displayQuestion();
        startTimer();
        for (var i = 0; i < options.length; i++) {
            alreadyAsked.push(options[i]);
        }
    })

    //----------------------OOP--------------------------//
    //todo convert to class - https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e
    var timerO = {
            running: false,
            start: function() {
                console.log("timerO: start timer");
                if (!this.running) {
                    intervalId = setInterval(this.decrement, 1000);
                    this.running = true;
                }
            },
            decrement: function() {
                console.log("timerO: decrement: " + timer);
                // $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
                $("#timeleft").html("Time remaining: " + timer);
                timer--;

                if (timer === 0) {
                    unanswerCount++;
                    timerO.stop();
                    $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                    displayResult();
                }
            },
            stop: function() {
                console.log("timerO: stop timer");
                this.running = false;
                clearInterval(intervalId);
            }
        }
        //----------------------OOP--------------------------//    

    function displayQuestion() {
        console.log("display question");
        pick = options[generateRandomNumnber(options.length)];

        $("#questionblock").html("<h3>" + pick.question + "</h3>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
        }

        $(".answerchoice").on("click", function() {
            console.log("click answer: ");
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));
            console.log("user guess: " + userGuess + "/" + "answer: " + pick.answer);
            checkAnswer(userGuess, pick);

        })
    }

    function checkAnswer(userGuess, pick) {
        console.log("checkAnswer - pick: " + pick.answer);
        timerO.stop();
        if (userGuess === pick.answer) {
            correctCount++;
            $("#answerblock").html("<p>Correct!</p>");
        } else {
            wrongCount++;
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
        }
        userGuess = ""
        displayResult();
    }

    function displayResult() {
        console.log("display result");
        // $("#answerblock").append("<img src=" + pick.photo + ">");
        options.splice(index, 1);

        setTimeout(function() {
            $("#answerblock").empty();
            timer = 5;

            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                console.log(options.length + "/" + alreadyAsked.length);
                //todo extract to method
                $("#questionblock").empty();
                $("#questionblock").html("<h4>Game Over: </h4>");
                $("#answerblock").append("<h5> Correct: " + correctCount + "</h5>");
                $("#answerblock").append("<h5> Incorrect: " + wrongCount + "</h5>");
                $("#answerblock").append("<h5> Unanswered: " + unanswerCount + "</h5>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                console.log(options.length + "/" + alreadyAsked.length);
                timerO.start();
                displayQuestion();

            }
        }, 3000);
    }

    $("#reset").on("click", function() {
        console.log("reset game");
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < alreadyAsked.length; i++) {
            options.push(alreadyAsked[i]);
        }
        timerO.start();
        displayQuestion();
    })

    var generateRandomNumnber = function(max) {
        return Math.floor(Math.random() * max);
    }

    var getNextQuestion = function() {
        var alreadyUsed = [];
        var index = generateRandomNumnber(options.length);
        if (alreadyAsked.length === options.length) {
            console.log("done");
        }
        var question = options[index];
        // if ()

    }

    init();
})