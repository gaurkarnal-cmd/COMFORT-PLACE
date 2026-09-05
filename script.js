javascript
/* =========================================================
   COMFORT PLACE 💗
   FINAL CLEANED & COMPATIBLE SCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   DOM HELPERS
   ========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   SAFE EVENT HELPER
   Prevents the whole script from crashing if an element
   does not exist.
   ========================================================= */

function on(element, event, callback, options) {
    if (!element) return;
    element.addEventListener(event, callback, options);
}


/* =========================================================
   APP STATE
   ========================================================= */

const AppState = {
    popupOpen: false,
    musicPlaying: false,
    letterOpen: false,
    periodMessageIndex: 0
};


/* =========================================================
   START APP
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();
    initializeEnterButton();

    initializeComfortPopup();
    initializePeriodComfort();
    initializeChocolate();

    initializeLoveLetter();
    initializeComfortMachine();

    initializeMusic();

    initializeFinalSurprise();

    initializeBackgroundHearts();
    initializeScrollReveal();

    initializeHeartInteractions();
    initializeImageFallbacks();

    initializeKeyboardControls();
    initializeButtonEffects();

    console.log(
        "%c💗 Comfort Place loaded successfully!",
        "font-size:16px;font-weight:bold;color:#d85c88;"
    );

});


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    $$("[data-scroll]").forEach(button => {

        on(button, "click", () => {

            const sectionId = button.dataset.scroll;

            const section =
                document.getElementById(sectionId);

            if (!section) return;

            const navbar =
                $(".navbar");

            const offset =
                navbar
                    ? navbar.offsetHeight + 20
                    : 20;

            const position =
                section.getBoundingClientRect().top +
                window.scrollY -
                offset;

            window.scrollTo({
                top: Math.max(0, position),
                behavior: "smooth"
            });

        });

    });


    /* Supports upgraded navigation buttons too */

    $$(".nav-links button:not([data-scroll])").forEach(button => {

        on(button, "click", () => {

            const target =
                button.dataset.target ||
                button.dataset.section;

            if (!target) return;

            const element =
                document.querySelector(
                    target.startsWith("#")
                        ? target
                        : `#${target}`
                );

            if (!element) return;

            element.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    /* NAV HEART */

    const navHeart =
        $("#navHeart") ||
        $(".nav-heart");

    on(navHeart, "click", event => {

        const x =
            event.clientX || window.innerWidth / 2;

        const y =
            event.clientY || window.innerHeight / 2;

        createHeartBurst(x, y, 18);

    });

}


/* =========================================================
   ENTER BUTTON
   ========================================================= */

function initializeEnterButton() {

    const enterButton =
        $("#enterButton") ||
        $(".main-button");

    on(enterButton, "click", event => {

        const cozySection =
            $(".cozy-section");

        if (cozySection) {

            cozySection.scrollIntoView({
                behavior: "smooth"
            });

        }

        createHeartBurst(
            event.clientX || window.innerWidth / 2,
            event.clientY || window.innerHeight / 2,
            18
        );

    });

}


/* =========================================================
   COMFORT POPUP
   ========================================================= */

function initializeComfortPopup() {

    const popup =
        $("#comfortPopup") ||
        $(".comfort-popup");

    if (!popup) return;


    const closeButton =
        $("#comfortClose") ||
        $(".comfort-close") ||
        $(".close-button", popup);


    const contents = [
        $("#hugContent"),
        $("#kittyContent"),
        $("#miniChocolateContent")
    ].filter(Boolean);


    function openComfort(type) {

        popup.classList.add("show");

        AppState.popupOpen = true;

        document.body.style.overflow = "hidden";


        contents.forEach(content => {

            content.classList.remove("active");

        });


        let activeContent = null;

        if (type === "hug") {
            activeContent = $("#hugContent");
        }

        if (type === "kitty") {
            activeContent = $("#kittyContent");
        }

        if (type === "chocolate") {
            activeContent = $("#miniChocolateContent");
        }


        if (activeContent) {

            activeContent.classList.add("active");

        } else if (contents.length) {

            contents[0].classList.add("active");

        }

    }


    function closeComfort() {

        popup.classList.remove("show");

        AppState.popupOpen = false;

        document.body.style.overflow = "";

    }


    /* HUG CARD */

    const hugCard =
        $("#hugCard") ||
        $('[data-comfort="hug"]');

    on(hugCard, "click", event => {

        openComfort("hug");

        createHeartBurst(
            event.clientX || window.innerWidth / 2,
            event.clientY || window.innerHeight / 2,
            22
        );

    });


    /* KITTY CARD */

    const kittyCard =
        $("#kittyCard") ||
        $('[data-comfort="kitty"]');

    on(kittyCard, "click", event => {

        openComfort("kitty");

        showRandomKitty();

        createHeartBurst(
            event.clientX || window.innerWidth / 2,
            event.clientY || window.innerHeight / 2,
            14
        );

    });


    /* MINI CHOCOLATE CARD */

    const miniChocolateCard =
        $("#miniChocolateCard") ||
        $('[data-comfort="chocolate"]');

    on(miniChocolateCard, "click", event => {

        openComfort("chocolate");

        createChocolateRain(16);

        createHeartBurst(
            event.clientX || window.innerWidth / 2,
            event.clientY || window.innerHeight / 2,
            12
        );

    });


    /* CLOSE */

    on(closeButton, "click", closeComfort);


    /* CLICK OUTSIDE */

    on(popup, "click", event => {

        if (event.target === popup) {
            closeComfort();
        }

    });


    /* ONE MORE HUG */

    const hugAgain =
        $("#hugAgain");

    on(hugAgain, "click", event => {

        createHeartBurst(
            event.clientX || window.innerWidth / 2,
            event.clientY || window.innerHeight / 2,
            30
        );

        const originalText =
            hugAgain.textContent;

        hugAgain.textContent =
            "🫂 BIGGEST HUG SENT 💗";

        setTimeout(() => {

            hugAgain.textContent =
                originalText;

        }, 1800);

    });


    /* MORE KITTY */

    const moreKitty =
        $("#moreKitty");

    on(moreKitty, "click", event => {

        showRandomKitty();

        createTinyHearts(
            event.clientX || window.innerWidth / 2,
            event.clientY || window.innerHeight / 2
        );

    });


    /* MORE CHOCOLATE */

    const moreChocolate =
        $("#moreChocolate");

    on(moreChocolate, "click", () => {

        createChocolateRain(28);

    });


    /* Allow other cards with data-comfort */

    $$("[data-comfort]").forEach(card => {

        on(card, "click", () => {

            const type =
                card.dataset.comfort;

            if (type) {
                openComfort(type);
            }

        });

    });

}


/* =========================================================
   KITTY SWITCHER
   ========================================================= */

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
        $("#popupKittyImage");

    const caption =
        $("#kittyCaption");

    if (image && kittyImages.length) {

        const randomImage =
            kittyImages[
                Math.floor(
                    Math.random() *
                    kittyImages.length
                )
            ];

        image.src =
            randomImage;

    }


    if (caption) {

        caption.textContent =
            kittyCaptions[
                Math.floor(
                    Math.random() *
                    kittyCaptions.length
                )
            ];

    }

}


/* =========================================================
   PERIOD COMFORT CENTER
   ========================================================= */

function initializePeriodComfort() {

    const periodButton =
        $("#periodButton") ||
        $(".period-button");

    const result =
        $("#periodResult") ||
        $(".period-result");

    if (!periodButton) return;


    const messages = [

        "Take it slow today. Your comfort matters. 🌷",

        "A warm drink and a cozy blanket can make the day feel a little softer. 💗",

        "You don't have to be productive every minute. Rest is allowed. 🫶",

        "A warm shower or gentle movement may help you relax. 🌸",

        "Stay hydrated and give yourself permission to have a softer day. 💕",

        "Be extra kind to yourself today, Babuuu. You deserve care. 🐱💗",

        "Your Motuu is officially sending maximum comfort energy. 🫂"

    ];


    on(periodButton, "click", event => {

        const message =
            messages[
                AppState.periodMessageIndex %
                messages.length
            ];

        AppState.periodMessageIndex++;


        if (result) {

            result.textContent =
                message;

            result.classList.remove("show");

            requestAnimationFrame(() => {

                result.classList.add("show");

            });

        }


        createHeartBurst(
            event.clientX || window.innerWidth / 2,
            event.clientY || window.innerHeight / 2,
            12
        );

    });

}


/* =========================================================
   CHOCOLATE
   ========================================================= */

function initializeChocolate() {

    const button =
        $("#chocolateButton") ||
        $(".cute-button");

    const result =
        $("#chocolateResult") ||
        $(".result-message");

    if (!button) return;


    const messages = [

        "🍫 Chocolate delivered to Babuuu. Mission successful. 💗",

        "Emergency chocolate department is now OPEN. 🍫✨",

        "Okay okay... one chocolate break coming right up! 🥺🍫",

        "Chocolate makes everything at least 7% better. 💗",

        "Bournville department has been alerted immediately. 🚨🍫",

        "Chocolate mode: ACTIVATED 🍫💖"

    ];


    on(button, "click", event => {

        const message =
            messages[
                Math.floor(
                    Math.random() *
                    messages.length
                )
            ];


        if (result) {

            result.textContent =
                message;

            result.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(10px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 400,
                    easing: "ease-out"
                }
            );

        }


        createChocolateRain(22);


        createHeartBurst(
            event.clientX || window.innerWidth / 2,
            event.clientY || window.innerHeight / 2,
            12
        );

    });

}


/* =========================================================
   CHOCOLATE RAIN
   ========================================================= */

function createChocolateRain(amount = 20) {

    const symbols = [
        "🍫",
        "🍫",
        "🤎",
        "✨"
    ];


    for (let i = 0; i < amount; i++) {

        const chocolate =
            document.createElement("span");

        chocolate.className =
            "chocolate-rain";

        chocolate.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        chocolate.style.left =
            `${Math.random() * 100}vw`;

        chocolate.style.fontSize =
            `${16 + Math.random() * 20}px`;

        chocolate.style.animationDuration =
            `${1.2 + Math.random() * 1.5}s`;

        chocolate.style.animationDelay =
            `${Math.random() * 0.5}s`;

        document.body.appendChild(
            chocolate
        );


        setTimeout(() => {

            chocolate.remove();

        }, 3500);

    }

}


/* =========================================================
   LOVE LETTER
   ========================================================= */

function initializeLoveLetter() {

    const envelope =
        $("#envelope") ||
        $(".envelope");

    const letter =
        $("#letter") ||
        $(".letter");

    if (!envelope || !letter) return;


    on(envelope, "click", event => {

        if (AppState.letterOpen) return;

        AppState.letterOpen = true;


        envelope.classList.add("open");


        envelope.animate(
            [
                {
                    transform: "scale(1)"
                },
                {
                    transform:
                        "translateY(-8px) scale(1.03)"
                },
                {
                    transform:
                        "translateY(0) scale(1)"
                }
            ],
            {
                duration: 500,
                easing: "ease-out"
            }
        );


        setTimeout(() => {

            envelope.style.opacity = "0";
            envelope.style.pointerEvents = "none";

            letter.classList.add("open");
            letter.classList.add("show");

            createHeartBurst(
                event.clientX || window.innerWidth / 2,
                event.clientY || window.innerHeight / 2,
                26
            );


            setTimeout(() => {

                letter.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 300);

        }, 450);

    });

}


/* =========================================================
   COMFORT MACHINE
   ========================================================= */

function initializeComfortMachine() {

    const button =
        $("#comfortButton") ||
        $(".comfort-button");

    const result =
        $("#comfortResult") ||
        $(".comfort-result");

    if (!button) return;


    const messages = [

        "Idhar aao babuuu 🫂💗",

        "Motuu is sending you the biggest virtual hug ever. 🧸",

        "No pressure. Take things one tiny step at a time. 🌷",

        "You deserve a soft, peaceful evening. 🎀",

        "Emergency kitty has arrived. 🐱",

        "Bournville department has been alerted. 🍫😭",

        "One little smile for your Motuu? 🥺💗",

        "You are very, very loved. ♡"

    ];


    on(button, "click", event => {

        const message =
            messages[
                Math.floor(
                    Math.random() *
                    messages.length
                )
            ];


        if (result) {

            result.textContent =
                message;

            result.animate(
                [
                    {
                        opacity: 0,
                        transform: "scale(.96)"
                    },
                    {
                        opacity: 1,
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 350,
                    easing: "ease-out"
                }
            );

        }


        createHeartBurst(
            event.clientX || window.innerWidth / 2,
            event.clientY || window.innerHeight / 2,
            16
        );

    });

}


/* =========================================================
   MUSIC PLAYER
   ========================================================= */

function initializeMusic() {

    const audio =
        $("#audio") ||
        $(".music-player audio");

    const player =
        $(".music-player");

    const disc =
        $(".music-disc");

    if (!audio) return;


    on(audio, "play", () => {

        AppState.musicPlaying = true;

        if (player) {
            player.classList.add("playing");
        }

        if (disc) {
            disc.style.animationPlayState =
                "running";
        }

    });


    on(audio, "pause", () => {

        AppState.musicPlaying = false;

        if (player) {
            player.classList.remove("playing");
        }

        if (disc) {
            disc.style.animationPlayState =
                "paused";
        }

    });


    on(audio, "ended", () => {

        AppState.musicPlaying = false;

        if (player) {
            player.classList.remove("playing");
        }

    });

}


/* =========================================================
   FINAL SURPRISE
   ========================================================= */

function initializeFinalSurprise() {

    const button =
        $("#finalButton") ||
        $(".final-button");

    const popup =
        $("#finalPopup") ||
        $(".popup");

    if (!button || !popup) return;


    const closeButton =
        $("#closePopup") ||
        $(".close-button", popup);


    function openFinalPopup() {

        popup.classList.add("show");

        AppState.popupOpen = true;

        document.body.style.overflow = "hidden";

        createHeartExplosion();

    }


    function closeFinalPopup() {

        popup.classList.remove("show");

        AppState.popupOpen = false;

        document.body.style.overflow = "";

    }


    on(button, "click", openFinalPopup);

    on(closeButton, "click", closeFinalPopup);


    on(popup, "click", event => {

        if (event.target === popup) {

            closeFinalPopup();

        }

    });

}


/* =========================================================
   BACKGROUND HEARTS
   ========================================================= */

function initializeBackgroundHearts() {

    const container =
        $("#backgroundHearts") ||
        $(".background-hearts");

    if (!container) return;


    const symbols = [
        "♡",
        "♥",
        "✦",
        "✧",
        "💗",
        "💕"
    ];


    function createHeart() {

        if (document.hidden) return;


        const heart =
            document.createElement("span");

        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        heart.style.left =
            `${Math.random() * 100}%`;

        heart.style.animationDuration =
            `${8 + Math.random() * 8}s`;

        heart.style.fontSize =
            `${12 + Math.random() * 20}px`;

        container.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 17000);

    }


    for (let i = 0; i < 5; i++) {

        setTimeout(
            createHeart,
            i * 800
        );

    }


    setInterval(
        createHeart,
        1800
    );

}


/* =========================================================
   HEART BURST
   ========================================================= */

function createHeartBurst(
    x = window.innerWidth / 2,
    y = window.innerHeight / 2,
    amount = 20
) {

    const symbols = [
        "💗",
        "💕",
        "♡",
        "✨",
        "🌸",
        "🎀"
    ];


    for (let i = 0; i < amount; i++) {

        const item =
            document.createElement("span");

        item.className =
            "heart-burst";

        item.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        item.style.left =
            `${x}px`;

        item.style.top =
            `${y}px`;

        item.style.fontSize =
            `${14 + Math.random() * 18}px`;


        const angle =
            Math.random() *
            Math.PI * 2;

        const distance =
            70 + Math.random() * 180;


        const moveX =
            Math.cos(angle) *
            distance;

        const moveY =
            Math.sin(angle) *
            distance;


        item.style.setProperty(
            "--x",
            `${moveX}px`
        );

        item.style.setProperty(
            "--y",
            `${moveY}px`
        );

        item.style.setProperty(
            "--rotate",
            `${Math.random() * 360}deg`
        );


        document.body.appendChild(
            item
        );


        setTimeout(() => {

            item.remove();

        }, 1400);

    }

}


/* =========================================================
   TINY HEARTS
   ========================================================= */

function createTinyHearts(
    x = window.innerWidth / 2,
    y = window.innerHeight / 2
) {

    createHeartBurst(
        x,
        y,
        10
    );

}


/* =========================================================
   HEART EXPLOSION
   ========================================================= */

function createHeartExplosion() {

    const centerX =
        window.innerWidth / 2;

    const centerY =
        window.innerHeight / 2;

    createHeartBurst(
        centerX,
        centerY,
        45
    );

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initializeScrollReveal() {

    const elements = [

        ...$$(".section"),
        ...$$(".final-section"),
        ...$$(".memory-card"),
        ...$$(".little-card")

    ];

    if (!elements.length) return;


    elements.forEach((element, index) => {

        if (element.classList.contains("hero")) {
            return;
        }

        element.classList.add("reveal");

        element.style.transitionDelay =
            `${Math.min(index * 0.04, 0.25)}s`;

    });


    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   IMAGE FALLBACKS
   ========================================================= */

function initializeImageFallbacks() {

    $$("img").forEach(img => {

        on(img, "error", () => {

            if (img.dataset.fallbackApplied) return;

            img.dataset.fallbackApplied =
                "true";

            img.style.objectFit =
                "contain";

            img.style.padding =
                "30px";

            img.style.background =
                "#fff0f5";


            const placeholder =
                document.createElement("div");

            placeholder.textContent =
                "💗";

            placeholder.style.fontSize =
                "50px";


            if (
                !img.getAttribute("alt")
            ) {

                img.alt =
                    "Comfort Place memory";

            }

        });


        on(img, "load", () => {

            img.classList.add("loaded");

        });

    });

}


/* =========================================================
   DOUBLE CLICK HEARTS
   ========================================================= */

function initializeHeartInteractions() {

    $$(
        ".memory-card, .polaroid, .chocolate-image"
    ).forEach(element => {

        on(element, "dblclick", event => {

            createHeartBurst(
                event.clientX,
                event.clientY,
                18
            );

        });

    });

}


/* =========================================================
   BUTTON EFFECTS
   ========================================================= */

function initializeButtonEffects() {

    const buttons =
        $$(
            ".main-button, .cute-button, .comfort-button, .final-button, .period-button, .nav-heart"
        );


    buttons.forEach(button => {

        button.setAttribute(
            "draggable",
            "false"
        );


        on(button, "pointerdown", () => {

            button.style.transform =
                "scale(.96)";

        });


        on(button, "pointerup", () => {

            button.style.transform =
                "";

        });


        on(button, "pointerleave", () => {

            button.style.transform =
                "";

        });

    });

}


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

function initializeKeyboardControls() {

    on(document, "keydown", event => {

        /* ESC closes all popups */

        if (event.key === "Escape") {

            $$(".comfort-popup.show, .popup.show")
                .forEach(popup => {

                    popup.classList.remove("show");

                });

            document.body.style.overflow = "";

            AppState.popupOpen = false;

        }


        /* H = little heart surprise */

        if (
            event.key.toLowerCase() === "h" &&
            !event.ctrlKey &&
            !event.metaKey
        ) {

            createHeartBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                14
            );

        }

    });

}


/* =========================================================
   PAGE VISIBILITY
   Pause music when tab is hidden
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (!document.hidden) return;

        const audio =
            $("#audio") ||
            $(".music-player audio");

        if (
            audio &&
            !audio.paused
        ) {

            audio.pause();

        }

    }
);


/* =========================================================
   END OF SCRIPT
   ========================================================= */

