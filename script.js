let friendName = "";

const userAnswers = {};


/* =========================
   CORRECT ANSWERS
   ========================= */

const correctAnswers = {

    1: "Blue",

    2: "Nuvvu Leka Nenu Lenu",

    3: "Lisa",

    4: "Lana Del Rey"

};


/* =========================
   QUESTION DATA
   ========================= */

const questionData = {

    1: {

        question:
            "What's my favourite colour? 💙",

        type:
            "simple",

        options: [

            {
                name: "🖤 Black",
                answer: "Black"
            },

            {
                name: "💙 Blue",
                answer: "Blue"
            },

            {
                name: "❤️ Maroon",
                answer: "Maroon"
            },

            {
                name: "💛 Yellow",
                answer: "Yellow"
            }

        ]

    },


    2: {

        question:
            "What's my favourite movie? 🎬",

        type:
            "photo",

        options: [

            {
                name: "Nee Sneham",
                answer: "Nee Sneham",
                image: "images/nee-sneham.jpg"
            },

            {
                name: "Hi Nanna",
                answer: "Hi Nanna",
                image: "images/hi-nanna.jpg"
            },

            {
                name: "Nuvvu Leka Nenu Lenu",
                answer: "Nuvvu Leka Nenu Lenu",
                image: "images/nuvvu-leka-nenu-lenu.jpg"
            },

            {
                name: "Mr Perfect",
                answer: "Mr Perfect",
                image: "images/mr-perfect.jpg"
            }

        ]

    },


    3: {

        question:
            "Who's my favourite BLACKPINK member? 🖤💗",

        type:
            "photo",

        options: [

            {
                name: "Jennie",
                answer: "Jennie",
                image: "images/jennie.jpg"
            },

            {
                name: "Lisa",
                answer: "Lisa",
                image: "images/lisa.jpg"
            },

            {
                name: "Jisoo",
                answer: "Jisoo",
                image: "images/jisoo.jpg"
            },

            {
                name: "Rosé",
                answer: "Rosé",
                image: "images/rose.jpg"
            }

        ]

    },


    4: {

        question:
            "Who's my favourite singer? 🎧",

        type:
            "photo",

        options: [

            {
                name: "Lana Del Rey",
                answer: "Lana Del Rey",
                image: "images/lana-del-rey.jpg"
            },

            {
                name: "Anirudh",
                answer: "Anirudh",
                image: "images/anirudh.jpg"
            },

            {
                name: "Sai Abhyankar",
                answer: "Sai Abhyankar",
                image: "images/sai-abhyankar.jpg"
            },

            {
                name: "Ariana Grande",
                answer: "Ariana Grande",
                image: "images/ariana-grande.jpg"
            }

        ]

    }

};


/* =========================
   CLICK SOUND
   ========================= */

let audioContext = null;


function playClickSound() {

    try {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }


        if (
            audioContext.state ===
            "suspended"
        ) {

            audioContext.resume();

        }


        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();


        oscillator.type =
            "sine";


        oscillator.frequency.setValueAtTime(
            700,
            audioContext.currentTime
        );


        oscillator.frequency.exponentialRampToValueAtTime(
            1050,
            audioContext.currentTime + 0.08
        );


        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.12,
            audioContext.currentTime + 0.01
        );


        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.16
        );


        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );


        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.16
        );

    }

    catch (error) {

        console.log(
            "Sound unavailable."
        );

    }

}


/* =========================
   START
   ========================= */

function startSlamBook() {

    playClickSound();

    document
        .getElementById("welcomeScreen")
        .classList.add("hidden");

    document
        .getElementById("nameScreen")
        .classList.remove("hidden");

}


/* =========================
   SAVE NAME
   ========================= */

function saveName() {

    const input =
        document.getElementById(
            "friendName"
        );


    friendName =
        input.value.trim();


    if (!friendName) {

        alert(
            "Please enter your name 💙🦚"
        );

        input.focus();

        return;

    }


    playClickSound();


    document
        .getElementById("nameScreen")
        .classList.add("hidden");


    showQuestion(1);

}


/* =========================
   SHOW QUESTION
   ========================= */

function showQuestion(number) {

    document
        .querySelectorAll(".question-screen")
        .forEach(function(screen) {

            screen.classList.add(
                "hidden"
            );

        });


    const question =
        document.getElementById(
            "question" + number
        );


    if (!question) {
        return;
    }


    question.classList.remove(
        "hidden"
    );


    question.classList.remove(
        "slide-in"
    );


    void question.offsetWidth;


    question.classList.add(
        "slide-in"
    );

}


/* =========================
   OPTION CLICK
   ========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const options =
            document.querySelectorAll(
                ".answer-option, .photo-option"
            );


        options.forEach(
            function(option) {

                option.addEventListener(
                    "click",
                    function() {

                        const parent =
                            option.parentElement;


                        parent
                            .querySelectorAll(
                                ".answer-option, .photo-option"
                            )
                            .forEach(
                                function(other) {

                                    other.classList.remove(
                                        "selected"
                                    );

                                }
                            );


                        option.classList.add(
                            "selected"
                        );


                        const answer =
                            option.dataset.answer;


                        const question =
                            option.closest(
                                ".question-screen"
                            );


                        const number =
                            Number(
                                question.id.replace(
                                    "question",
                                    ""
                                )
                            );


                        userAnswers[number] =
                            answer;


                        playClickSound();


                        createPeacockEffect(
                            option
                        );

                    }
                );

            }
        );

    }
);


/* =========================
   PEACOCK + FLUTE EFFECT
   ========================= */

function createPeacockEffect(button) {

    const emojis = [
        "🦚",
        "🪈",
        "🦚",
        "🪈",
        "🦚",
        "🦚"
    ];


    const rectangle =
        button.getBoundingClientRect();


    emojis.forEach(
        function(emoji, index) {

            const element =
                document.createElement(
                    "span"
                );


            element.className =
                "floating-peacock";


            element.textContent =
                emoji;


            element.style.left =
                (
                    rectangle.left +
                    rectangle.width / 2 +
                    (index - 2.5) * 28
                ) + "px";


            element.style.top =
                (
                    rectangle.top +
                    rectangle.height / 2
                ) + "px";


            document.body.appendChild(
                element
            );


            setTimeout(
                function() {

                    element.remove();

                },
                1400
            );

        }
    );

}


/* =========================
   NEXT QUESTION
   ========================= */

function nextQuestion(number) {

    playClickSound();


    if (
        number <= 4 &&
        !userAnswers[number]
    ) {

        alert(
            "Choose an answer first 💙🦚"
        );

        return;

    }


    if (number >= 5) {

        const textarea =
            document.getElementById(
                "answer" + number
            );


        if (textarea) {

            userAnswers[number] =
                textarea.value.trim();

        }

    }


    showQuestion(
        number + 1
    );

}


/* =========================
   SUBMIT
   ========================= */

function submitSlamBook() {

    const answer10 =
        document.getElementById(
            "answer10"
        );


    userAnswers[10] =
        answer10.value.trim();


    playClickSound();


    let score = 0;


    for (
        let i = 1;
        i <= 4;
        i++
    ) {

        if (
            userAnswers[i] ===
            correctAnswers[i]
        ) {

            score++;

        }

    }


    document
        .querySelectorAll(".question-screen")
        .forEach(function(screen) {

            screen.classList.add(
                "hidden"
            );

        });


    document
        .getElementById("resultsScreen")
        .classList.remove("hidden");


    document.getElementById(
        "scoreText"
    ).textContent =
        score + " / 4";


    let message;


    if (score === 4) {

        message =
            "PERFECT! You really know me! 🥹💙🦚";

    }

    else if (score === 3) {

        message =
            "Okayyy! You know me pretty well! 💙✨";

    }

    else if (score === 2) {

        message =
            "Not bad... but you need to know me better! 😂🦚";

    }

    else if (score === 1) {

        message =
            "We definitely need to spend more time together! 😭😂";

    }

    else {

        message =
            "WHO ARE YOU?! 😭😂🦚";

    }


    document.getElementById(
        "resultMessage"
    ).textContent =
        message;


    createAnswerReview();

}


/* =========================
   FINAL REVIEW
   ========================= */

function createAnswerReview() {

    const review =
        document.getElementById(
            "answerReview"
        );


    review.innerHTML = "";


    for (
        let number = 1;
        number <= 4;
        number++
    ) {

        const data =
            questionData[number];


        const selected =
            userAnswers[number];


        const correct =
            correctAnswers[number];


        const box =
            document.createElement(
                "div"
            );


        box.className =
            "result-question";


        const title =
            document.createElement(
                "div"
            );


        title.className =
            "result-question-title";


        title.textContent =
            "QUESTION " + number;


        box.appendChild(
            title
        );


        const questionText =
            document.createElement(
                "div"
            );


        questionText.className =
            "result-question-text";


        questionText.textContent =
            data.question;


        box.appendChild(
            questionText
        );


        if (
            data.type ===
            "photo"
        ) {

            createPhotoResult(
                box,
                data.options,
                selected,
                correct
            );

        }

        else {

            createSimpleResult(
                box,
                data.options,
                selected,
                correct
            );

        }


        review.appendChild(
            box
        );

    }

}


/* =========================
   PHOTO RESULTS
   ========================= */

function createPhotoResult(
    container,
    options,
    selected,
    correct
) {

    const grid =
        document.createElement(
            "div"
        );


    grid.className =
        "result-photo-grid";


    options.forEach(
        function(option) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "result-photo-option";


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                option.image;


            image.alt =
                option.name;


            card.appendChild(
                image
            );


            const name =
                document.createElement(
                    "div"
                );


            name.className =
                "result-photo-name";


            name.textContent =
                option.name;


            card.appendChild(
                name
            );


            if (
                option.answer ===
                correct
            ) {

                card.classList.add(
                    "result-correct"
                );


                const label =
                    document.createElement(
                        "div"
                    );


                label.className =
                    "answer-label correct-label";


                label.textContent =
                    "✓ CORRECT";


                card.appendChild(
                    label
                );

            }


            if (
                option.answer === selected &&
                selected !== correct
            ) {

                card.classList.add(
                    "result-wrong"
                );


                const label =
                    document.createElement(
                        "div"
                    );


                label.className =
                    "answer-label wrong-label";


                label.textContent =
                    "✕ YOUR ANSWER";


                card.appendChild(
                    label
                );

            }


            grid.appendChild(
                card
            );

        }
    );


    container.appendChild(
        grid
    );

}


/* =========================
   SIMPLE RESULTS
   ========================= */

function createSimpleResult(
    container,
    options,
    selected,
    correct
) {

    const grid =
        document.createElement(
            "div"
        );


    grid.className =
        "result-simple-grid";


    options.forEach(
        function(option) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "result-simple-option";


            item.textContent =
                option.name;


            if (
                option.answer ===
                correct
            ) {

                item.classList.add(
                    "result-correct"
                );

            }


            if (
                option.answer === selected &&
                selected !== correct
            ) {

                item.classList.add(
                    "result-wrong"
                );

            }


            grid.appendChild(
                item
            );

        }
    );


    container.appendChild(
        grid
    );

}