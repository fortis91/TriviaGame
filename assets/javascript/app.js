$(document).ready(function () {
    console.log("ready to go");
    $("#reset").hide();

    const decrementRate = 1000;
    const timeoutRate = 3000;
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 5;
    var userGuess = "";
    var qCount = options.length;
    var pick;
    var index;
    var alreadyAsked = [];
    var moreQuestions = true;

    var background = document.createElement("audio");
    background.setAttribute("src", "assets/sounds/beep-22.mp3");
    var end = document.createElement("audio");
    end.setAttribute("src", "assets/sounds/end.mp3");

    //------------------------------------------------------------------------//    
    var init = function () {
        console.clear();
        console.log("initialize");
        $("#start").hide();
        showQuestion();
        timerO.start();
    }
    //------------------------------------------------------------------------//    


    $("#start").on("click", function () {
        console.log("starting game");
        $("#start").hide();
        showQuestion();
        timerO.start();
    })


    //----------------------OOP--------------------------//
    //todo convert to class - https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e
    var timerO = {
        running: false,
        intervalId: 0,
        start: function () {
            console.log("timerO: start timer");
            if (!this.running) {
                this.intervalId = setInterval(this.decrement, decrementRate);
                this.running = true;
            }
        },
        decrement: function () {
            // $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
            $("#timeleft").html("Time remaining: " + timer);
            timer--;
            if (timer === 0) {
                unanswerCount++;
                timerO.stop();
                $("#answer").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                showAnswer();
            }
        },
        stop: function () {
            console.log("timerO: stop timer");
            this.running = false;
            clearInterval(this.intervalId);
        }
    }
    //----------------------OOP--------------------------//    


    var showQuestion = function () {
        console.log("show question/more questions: "+moreQuestions);
        //pick = options[generateRandomNumnber(options.length)];
        pick = getNextQuestion();
        // console.log(pick.question);
        $("#question").html("<h3>" + pick.question + "</h3>");
        for (var i = 0; i < pick.choice.length; i++) {
            var newDiv = $('<div class="form-check">');
            var radioButton = $('<input class="form-check-input" type="radio" name="radio" id="' + i + '" value="' + i + '" />');
            var radioLabel = $('<label class="form-check-label" for="' + i + '">').text(pick.choice[i]);
            newDiv.append(radioButton, radioLabel);
            $('#answer').append(newDiv);
        }

        $(".form-check-input").on("click", function () {
            console.log("click answer: ");
            userGuess = parseInt(this.value);
            checkAnswer(userGuess, pick);

        })
    }


    function checkAnswer(userGuess, pick) {
        timerO.stop();
        if (userGuess === pick.answer) {
            correctCount++;
            $("#answer").html("<p>Correct!</p>");
        } else {
            wrongCount++;
            $("#answer").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
        }
        userGuess = ""
        showAnswer();
    }


    var showAnswer = function () {
        console.log("show answer");
        // $("#answerblock").append("<img src=" + pick.photo + ">");
        // options.splice(index, 1);
        setTimeout(function () {
            $("#answer").empty();
            timer = 5;
            // if ((wrongCount + correctCount + unanswerCount) === qCount) {
            if (!moreQuestions) {
                showStats();
            } else {
                timerO.start();
                showQuestion();
            }
        }, timeoutRate);
    }


    var showStats = function () {
        $("#question").empty();
        $("#question").html("<h4>Game Over </h4>");
        $("#answer").append("<h5> Correct: " + correctCount + "</h5>");
        $("#answer").append("<h5> Incorrect: " + wrongCount + "</h5>");
        $("#answer").append("<h5> Unanswered: " + unanswerCount + "</h5>");
        $("#reset").show();
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;
    }


    $("#reset").on("click", function () {
        console.clear();
        console.log("reset game");
        $("#reset").hide();
        $("#answer").empty();
        $("#question").empty();
        alreadyAsked = [];
        moreQuestions = true;

        timerO.start();
        showQuestion();
    })


    var generateRandomNumnber = function (max) {
        return Math.floor(Math.random() * max);
    }


    var getNextQuestion = function () {
        console.log("more questions: " + moreQuestions);
        var randomNumber = generateRandomNumnber(options.length);
        if (alreadyAsked.length === options.length) {
            console.log("asked filled");
            alreadyAsked = [];
            moreQuestions = false;
            return;
        }
        var question = options[randomNumber];
        if (moreQuestions && alreadyAsked.indexOf(question) !== -1) {
            console.log("recursive: "+randomNumber);
            return getNextQuestion();
        }
        alreadyAsked.push(question);
        if (alreadyAsked.length === options.length) {
            moreQuestions = false;
        }

        return question;
    }


    //init();
    //displayQuestion();
})