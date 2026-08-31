
/* =========================================
   COMFORT PLACE — INTERACTIONS
========================================= */


/* =========================================
   BACKGROUND HEARTS
========================================= */

const backgroundHearts =
    document.getElementById("backgroundHearts");

const heartSymbols = [
    "♡",
    "♥",
    "✦",
    "✧",
    "💗"
];

function createBackgroundHeart() {

    const heart =
        document.createElement("span");

    heart.textContent =
        heartSymbols[
            Math.floor(
                Math.random() * heartSymbols.length
            )
        ];

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.animationDuration =
        (8 + Math.random() * 8) + "s";

    heart.style.animationDelay =
        Math.random() * 4 + "s";

    heart.style.fontSize =
        (12 + Math.random() * 15) + "px";

    backgroundHearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 18000);
}

setInterval(createBackgroundHeart, 700);


/* =========================================
   NAVIGATION
========================================= */

document
    .querySelectorAll("[data-scroll]")
    .forEach(button => {

        button.addEventListener("click", () => {

            const sectionId =
                button.dataset.scroll;

            const section =
                document.getElementById(sectionId);

            if (section) {

                section.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


/* =========================================
   ENTER BUTTON
========================================= */

const enterButton =
    document.getElementById("enterButton");

enterButton.addEventListener("click", () => {

    document
        .querySelector(".cozy-section")
        .scrollIntoView({
            behavior: "smooth"
        });

    createHeartBurst();

});


/* =========================================
   NAV HEART
========================================= */

document
    .getElementById("navHeart")
    .addEventListener("click", () => {

        createHeartBurst();

    });


/* =========================================
   COZY CARDS
========================================= */


/* =========================================
   COMFORT CENTER
========================================= */

const comfortPopup =
    document.getElementById("comfortPopup");

const comfortClose =
    document.getElementById("comfortClose");

const hugContent =
    document.getElementById("hugContent");

const kittyContent =
    document.getElementById("kittyContent");

const chocolateContent =
    document.getElementById("miniChocolateContent");


function openComfort(type) {

    comfortPopup.classList.add("show");

    hugContent.classList.remove("active");
    kittyContent.classList.remove("active");
    chocolateContent.classList.remove("active");


    if (type === "hug") {

        hugContent.classList.add("active");

    }

    if (type === "kitty") {

        kittyContent.classList.add("active");

    }

    if (type === "chocolate") {

        chocolateContent.classList.add("active");

    }

}


/* HUG */

document
    .getElementById("hugCard")
    .addEventListener("click", () => {

        openComfort("hug");

        createHeartBurst();

    });


/* KITTY */

document
    .getElementById("kittyCard")
    .addEventListener("click", () => {

        openComfort("kitty");

        showRandomKitty();

    });


/* CHOCOLATE */

document
    .getElementById("miniChocolateCard")
    .addEventListener("click", () => {

        openComfort("chocolate");

        createChocolateRain();

    });


/* CLOSE */

comfortClose.addEventListener("click", () => {

    comfortPopup.classList.remove("show");

});


/* CLICK OUTSIDE */

comfortPopup.addEventListener("click", event => {

    if (event.target === comfortPopup) {

        comfortPopup.classList.remove("show");

    }

});


/* =========================================
   ONE MORE HUG
========================================= */

document
    .getElementById("hugAgain")
    .addEventListener("click", () => {

        createHeartBurst();

        const button =
            document.getElementById("hugAgain");

        button.textContent =
            "🫂 BIGGER HUG SENT 💗";

        setTimeout(() => {

            button.textContent =
                "🫂 One more hug";

        }, 1800);

    });


/* =========================================
   KITTY SWITCHER
========================================= */

const kittyImages = [
    "images/kitty1.jpg",
    "images/kitty2.jpg",
    "images/kitty3.jpg"
];

const kittyCaptions = [
    "Tiny kitty has arrived. 🐱🎀",
    "This one came specifically for Babuuu. 🥺",
    "Comfort kitty reporting for duty. 🫡🐱",
    "Okay fine... one more tiny baby. 🧸",
    "Motuu ordered maximum cuteness. 💗"
];


function showRandomKitty() {

    const image =
        document.getElementById("popupKittyImage");

    const caption =
        document.getElementById("kittyCaption");

    const randomIndex =
        Math.floor(
            Math.random() *
            kittyImages.length
        );

    image.src =
        kittyImages[randomIndex];

    caption.textContent =
        kittyCaptions[
            Math.floor(
                Math.random() *
                kittyCaptions.length
            )
        ];

}


document
    .getElementById("moreKitty")
    .addEventListener("click", () => {

        showRandomKitty();

        createTinyHearts();

    });


/* =========================================
   MORE CHOCOLATE
========================================= */

document
    .getElementById("moreChocolate")
    .addEventListener("click", () => {

        createChocolateRain();

    });



/* =========================================
   CHOCOLATE
========================================= */

const chocolateButton =
    document.getElementById("chocolateButton");

const chocolateResult =
    document.getElementById("chocolateResult");

chocolateButton.addEventListener("click", () => {

    chocolateResult.textContent =
        "🍫 Chocolate delivered to Babuuu. Mission successful. 💗";

    createChocolateRain();

});


/* =========================================
   LOVE LETTER
========================================= */

const envelope =
    document.getElementById("envelope");

const letter =
    document.getElementById("letter");

envelope.addEventListener("click", () => {

    envelope.classList.add("open");

    setTimeout(() => {

        envelope.style.opacity = "0";
        envelope.style.pointerEvents = "none";

        letter.classList.add("show");

        createHeartBurst();

    }, 450);

});


/* =========================================
   COMFORT MACHINE
========================================= */

const comfortButton =
    document.getElementById("comfortButton");

const comfortResult =
    document.getElementById("comfortResult");

const comfortMessages = [

    "Idhar aao babuuu 🫂💗",

    "Motuu is sending you the biggest virtual hug ever. 🧸",

    "No pressure. Take things one tiny step at a time. 🌷",

    "You deserve a soft, peaceful evening. 🎀",

    "Emergency kitty has arrived. 🐱",

    "Bournville department has been alerted. 🍫😭",

    "One little smile for your Motuu? 🥺💗",

    "You are very, very loved. ♡"

];

comfortButton.addEventListener("click", () => {

    const random =
        comfortMessages[
            Math.floor(
                Math.random() *
                comfortMessages.length
            )
        ];

    comfortResult.textContent = random;

    createTinyHearts();

});


/* =========================================
   MUSIC PLAYER
========================================= */

const audio =
    document.getElementById("audio");

const musicDisc =
    document.querySelector(".music-disc");

audio.addEventListener("play", () => {

    musicDisc.style.animationPlayState =
        "running";

});

audio.addEventListener("pause", () => {

    musicDisc.style.animationPlayState =
        "paused";

});


/* =========================================
   FINAL SURPRISE
========================================= */

const finalButton =
    document.getElementById("finalButton");

const finalPopup =
    document.getElementById("finalPopup");

const closePopup =
    document.getElementById("closePopup");

finalButton.addEventListener("click", () => {

    finalPopup.classList.add("show");

    createHeartExplosion();

});

closePopup.addEventListener("click", () => {

    finalPopup.classList.remove("show");

});

finalPopup.addEventListener("click", event => {

    if (event.target === finalPopup) {

        finalPopup.classList.remove("show");

    }

});


/* =========================================
   HEART BURST
========================================= */

function createHeartBurst() {

    const symbols = [
        "💗",
        "💕",
        "♡",
        "✨",
        "🌸",
        "🎀"
    ];

    for (let i = 0; i < 22; i++) {

        const item =
            document.createElement("span");

        item.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        item.style.position = "fixed";
        item.style.left = "50%";
        item.style.top = "50%";

        item.style.fontSize =
            (15 + Math.random() * 20) + "px";

        item.style.pointerEvents = "none";
        item.style.zIndex = "200";

        document.body.appendChild(item);

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 260;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        const animation =
            item.animate(

                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(.2)",

                        opacity: 0
                    },

                    {
                        transform:
                            `translate(
                                calc(-50% + ${x}px),
                                calc(-50% + ${y}px)
                            )
                            scale(1.1)`,

                        opacity: 1
                    },

                    {
                        transform:
                            `translate(
                                calc(-50% + ${x * 1.3}px),
                                calc(-50% + ${y * 1.3}px)
                            )
                            scale(.5)`,

                        opacity: 0
                    }
                ],

                {
                    duration:
                        1300 +
                        Math.random() * 700,

                    easing: "ease-out"
                }

            );

        animation.onfinish = () => {

            item.remove();

        };

    }

}


/* =========================================
   TINY HEARTS
========================================= */

function createTinyHearts() {

    for (let i = 0; i < 12; i++) {

        const heart =
            document.createElement("span");

        heart.textContent =
            ["♡", "♥", "💗"][
                Math.floor(Math.random() * 3)
            ];

        heart.style.position = "fixed";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.bottom = "20px";

        heart.style.fontSize =
            (15 + Math.random() * 15) + "px";

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "150";

        document.body.appendChild(heart);

        const animation =
            heart.animate(

                [
                    {
                        transform:
                            "translateY(0)",
                        opacity: 0
                    },

                    {
                        transform:
                            "translateY(-220px)",
                        opacity: 1
                    },

                    {
                        transform:
                            "translateY(-420px)",
                        opacity: 0
                    }
                ],

                {
                    duration:
                        1700 +
                        Math.random() * 800,

                    easing: "ease-out"
                }

            );

        animation.onfinish = () => {

            heart.remove();

        };

    }

}


/* =========================================
   CHOCOLATE RAIN
========================================= */

function createChocolateRain() {

    for (let i = 0; i < 18; i++) {

        const chocolate =
            document.createElement("span");

        chocolate.textContent =
            Math.random() > .5
                ? "🍫"
                : "💗";

        chocolate.style.position = "fixed";

        chocolate.style.left =
            Math.random() * 100 + "vw";

        chocolate.style.top = "-40px";

        chocolate.style.fontSize =
            (18 + Math.random() * 18) + "px";

        chocolate.style.pointerEvents = "none";

        chocolate.style.zIndex = "150";

        document.body.appendChild(chocolate);

        const animation =
            chocolate.animate(

                [
                    {
                        transform:
                            "translateY(0) rotate(0deg)",

                        opacity: 1
                    },

                    {
                        transform:
                            `translateY(
                                ${window.innerHeight + 100}px
                            )
                            rotate(360deg)`,

                        opacity: 0
                    }
                ],

                {
                    duration:
                        1500 +
                        Math.random() * 1000,

                    easing: "ease-in"
                }

            );

        animation.onfinish = () => {

            chocolate.remove();

        };

    }

}


/* =========================================
   FINAL HEART EXPLOSION
========================================= */

function createHeartExplosion() {

    for (let i = 0; i < 45; i++) {

        const heart =
            document.createElement("span");

        heart.textContent =
            ["💗", "💕", "♡", "✨", "🎀"][
                Math.floor(Math.random() * 5)
            ];

        heart.style.position = "fixed";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.top =
            Math.random() * 100 + "vh";

        heart.style.fontSize =
            (15 + Math.random() * 25) + "px";

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "120";

        document.body.appendChild(heart);

        const animation =
            heart.animate(

                [
                    {
                        transform:
                            "scale(.3) rotate(0deg)",
                        opacity: 0
                    },

                    {
                        transform:
                            "scale(1.2) rotate(180deg)",
                        opacity: 1
                    },

                    {
                        transform:
                            "scale(.5) rotate(360deg)",
                        opacity: 0
                    }
                ],

                {
                    duration:
                        1800 +
                        Math.random() * 1000,

                    easing: "ease-out"
                }

            );

        animation.onfinish = () => {

            heart.remove();

        };

    }

}

