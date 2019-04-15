$(document).ready(function () {
    console.log("ready to go");
    $("#reset").hide();

    const decrementRate = 1000;
    const timeoutRate = 3000;

    var correctCount = 0;
    var incorrectCount = 0;
    var noAnswerCount = 0;

    var timer = 5;
    var answer = "";
    var question;
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
    //todo convert to class
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
                noAnswerCount++;
                timerO.stop();
                $("#answer").html("<p>The correct answer is: " + question.choice[question.answer] + "</p>");
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
        console.log("show question");
        question = getNextQuestion();
        $("#question").html("<h3>" + question.question + "</h3>");
        for (var i = 0; i < question.choice.length; i++) {
            var newDiv = $('<div class="form-check">');
            var radioButton = $('<input class="form-check-input" type="radio" name="radio" id="' + i + '" value="' + i + '" />');
            var radioLabel = $('<label class="form-check-label" for="' + i + '">').text(question.choice[i]);
            newDiv.append(radioButton, radioLabel);
            $('#answer').append(newDiv);
        }

        $(".form-check-input").on("click", function () {
            console.log("click answer: ");
            answer = parseInt(this.value);
            checkAnswer(answer, question);

        })
    }


    function checkAnswer(answer, question) {
        timerO.stop();
        if (answer === question.answer) {
            correctCount++;
            $("#answer").html("<p>Correct!</p>");
        } else {
            incorrectCount++;
            $("#answer").html("<p>The correct answer is: " + question.choice[question.answer] + "</p>");
        }
        answer = ""
        showAnswer();
    }


    var showAnswer = function () {
        console.log("show answer");
        // $("#answerblock").append("<img src=" + pick.photo + ">");
        setTimeout(function () {
            $("#answer").empty();
            timer = 5;
            if (moreQuestions) {
                showQuestion();
                timerO.start();
            }
            else {
                showStats();
            }
        }, timeoutRate);
    }


    var showStats = function () {
        $("#question").empty();
        $("#question").html("<h4>Game Over </h4>");
        $("#answer").append("<h5> Correct: " + correctCount + "</h5>");
        $("#answer").append("<h5> Incorrect: " + incorrectCount + "</h5>");
        $("#answer").append("<h5> Unanswered: " + noAnswerCount + "</h5>");
        $("#reset").show();
        correctCount = 0;
        incorrectCount = 0;
        noAnswerCount = 0;
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