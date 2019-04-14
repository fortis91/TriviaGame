$(document).ready(function () {
    console.log("ready to go");

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 5;
    var intervalId;
    var userGuess = "";
    var qCount = options.length;
    var pick;
    var index;
    var alreadyAsked = [];

    //------------------------------------------------------------------------//    
    var init = function () {
        console.clear();
        console.log("initialize");
        //$("#start").hide();
        //displayQuestion();
        timerO.start();
        for (var i = 0; i < options.length; i++) {
            alreadyAsked.push(options[i]);
        }
    }
    //------------------------------------------------------------------------//    

    $("#reset").hide();

    $("#start").on("click", function () {
        console.log("starting game");
        $("#start").hide();
        displayQuestion();
        timerO.start();
        for (var i = 0; i < options.length; i++) {
            alreadyAsked.push(options[i]);
        }
    })



      

    //----------------------OOP--------------------------//
    //todo convert to class - https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e
    var timerO = {
        running: false,
        start: function () {
            console.log("timerO: start timer");
            if (!this.running) {
                intervalId = setInterval(this.decrement, 1000);
                this.running = true;
            }
        },
        decrement: function () {
            // console.log("timerO: decrement: " + timer);
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
        stop: function () {
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
            var newDiv = $('<div class="form-check">');
            var radioButton = $('<input class="form-check-input" type="radio" name="radio" id="' + i + '" value="' + i + '" />');
            var radioLabel = $('<label class="form-check-label" for="' + i + '">').text(pick.choice[i]);
            newDiv.append(radioButton, radioLabel);
            $('#answerblock').append(newDiv);
        }

        $(".form-check-input").on("click", function () {
            console.log("click answer: ");
            userGuess = parseInt(this.value);
            console.log("user guess: " + userGuess + "/" + "answer: " + pick.answer);
            checkAnswer(userGuess, pick);

        })
    }

    // function displayQuestion() {
    //     console.log("display question");
    //     pick = options[generateRandomNumnber(options.length)];

    //     $("#questionblock").html("<h3>" + pick.question + "</h3>");
    //     for (var i = 0; i < pick.choice.length; i++) {
    //         var userChoice = $("<div>");
    //         userChoice.addClass("answerchoice");
    //         userChoice.html(pick.choice[i]);
    //         userChoice.attr("data-guessvalue", i);
    //         $("#answerblock").append(userChoice);
    //     }

    //     $(".answerchoice").on("click", function () {
    //         console.log("click answer: ");
    //         userGuess = parseInt($(this).attr("data-guessvalue"));
    //         console.log("user guess: " + userGuess + "/" + "answer: " + pick.answer);
    //         checkAnswer(userGuess, pick);

    //     })
    // }

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

        setTimeout(function () {
            $("#answerblock").empty();
            timer = 5;

            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                // console.log(options.length + "/" + alreadyAsked.length);
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
                // console.log(options.length + "/" + alreadyAsked.length);
                timerO.start();
                displayQuestion();
            }
        }, 3000);
    }

    $("#reset").on("click", function () {
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

    var generateRandomNumnber = function (max) {
        return Math.floor(Math.random() * max);
    }

    var getNextQuestion = function () {
        var randomNumber = generateRandomNumnber(options.length);
        // console.log("random: " + randomNumber +" more questions: "+moreQuestions);
        if (alreadyAsked.length === options.length) {
            console.log("asked filled");
            alreadyAsked = [];
            moreQuestions = false;
        }
        var question = options[randomNumber];
        if (moreQuestions && alreadyAsked.indexOf(question) !== -1) {
            console.log("recursive");
            return getNextQuestion();
        }
        alreadyAsked.push(question);
        return question;
    }

    //init();
    //displayQuestion();
})