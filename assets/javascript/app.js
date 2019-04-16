$(document).ready(function () {
    console.log("ready to go");
    $("#reset").hide();

    const decrementRate = 1000;
    const timeoutRate = 3000;

    var correctCount = 0;
    var incorrectCount = 0;

    var timer = 31;
    var answer = "";
    var question;
    var alreadyAsked = [];
    var moreQuestions = true;

    var background;
    var down;
    var end;
    

    var init = function () {
        console.clear();
        console.log("initialize");
        $("#start").hide();
        showQuestion();
        timerO.start();
    }


    $("#start").on("click", function () {
        console.log("starting game");
        background.pause();
        $("#start").hide();
        $('#instruction').hide();
        showQuestion();
        timerO.start();
    })


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
            timer--;
            $("#timeleft").html("Time remaining: " + timer);
            if (timer <= 5) {
                down.play();
            }
            if (timer === 0) {
                end.play();
                incorrectCount++;
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

//Todo: convert to OOP
    var showQuestion = function () {
        console.log("show question");
        question = getNextQuestion();
        $("#question").html("<h4>" + question.question + "</h4>");
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
            var winner = (images[generateRandomNumnber(images.length)]);
            console.log(winner);
            $("#answer").html("<p>Correct!</p>");
            $("#answer").append("<img src=" + winner + ">");
        } else {
            incorrectCount++;
            $("#answer").html("<p>The correct answer is: " + question.choice[question.answer] + "</p>");
        }
        answer = ""
        showAnswer();
    }


    var showAnswer = function () {
        console.log("show answer");
        setTimeout(function () {
            $("#answer").empty();
            timer = 31;
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
        $("#answer").append("Correct  : " + correctCount +"<br>");
        $("#answer").append("Incorrect: " + incorrectCount);
        $("#reset").show();
        correctCount = 0;
        incorrectCount = 0;
        noAnswerCount = 0;
        setTimeout(function () {
            playMusic();
        }, timeoutRate);
    }


    $("#reset").on("click", function () {
        console.clear();
        console.log("reset game");
        background.pause();
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
    
    var initializeMusic = function () {
        console.log("initialize music");
        down = document.createElement("audio");
        down.setAttribute("src", "assets/sounds/beep-22.mp3");
        end = document.createElement("audio");
        end.setAttribute("src", "assets/sounds/end.mp3");        
    }


    var getNextQuestion = function () {
        console.log("more questions: " + moreQuestions);
        var randomNumber = generateRandomNumnber(questions.length);
        if (alreadyAsked.length === questions.length) {
            console.log("asked filled");
            alreadyAsked = [];
            moreQuestions = false;
            return;
        }
        var question = questions[randomNumber];
        if (moreQuestions && alreadyAsked.indexOf(question) !== -1) {
            console.log("recursive: "+randomNumber);
            return getNextQuestion();
        }
        alreadyAsked.push(question);
        if (alreadyAsked.length === questions.length) {
            moreQuestions = false;
        }

        return question;
    }

    initializeMusic();
    var playMusic = function () {
        background = document.createElement("audio");
        background.setAttribute("src", music[generateRandomNumnber(music.length)]);
        console.log(background);
        background.play();
    }
    
    setTimeout(function () {
        playMusic();
    }, timeoutRate);

    
    //init();
    //displayQuestion();
})