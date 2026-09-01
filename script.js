/* =========================================================
   COMFORT PLACE 💗
   COMPLETE UPDATED SCRIPT
   ========================================================= */

"use strict";

/* =========================================================
   DOM HELPERS
   ========================================================= */

const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

const $$ = (selector, parent = document) => {
    return [...parent.querySelectorAll(selector)];
};

const safeAddEvent = (element, event, callback, options = {}) => {
    if (!element) return;
    element.addEventListener(event, callback, options);
};


/* =========================================================
   GLOBAL STATE
   ========================================================= */

const AppState = {
    popupOpen: false,
    currentPopup: null,
    musicPlaying: false,
    letterOpen: false,
    periodMessageIndex: 0,
    initialized: false
};


/* =========================================================
   PAGE READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (AppState.initialized) return;

    AppState.initialized = true;

    initializeNavigation();
    initializePopups();
    initializeComfortCards();
    initializePeriodComfort();
    initializeChocolate();
    initializeLoveLetter();
    initializeMusic();
    initializeHeartInteractions();
    initializeScrollReveal();
    initializeBackgroundHearts();
    initializeFinalSection();
    initializeKeyboardControls();
    initializeImageFallbacks();

});


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navButtons = $$(".nav-links button");

    navButtons.forEach(button => {

        safeAddEvent(button, "click", () => {

            const target =
                button.dataset.target ||
                button.getAttribute("data-section") ||
                button.getAttribute("aria-controls");

            if (target) {

                scrollToTarget(target);

                return;

            }

            const text = button.textContent
                .trim()
                .toLowerCase();

            const targetMap = {
                home: "#home",
                comfort: "#comfort",
                memories: "#memories",
                letter: "#letter",
                music: "#music",
                chocolate: "#chocolate",
                "little things": "#little-things"
            };

            if (targetMap[text]) {
                scrollToTarget(targetMap[text]);
            }

        });

    });


    const navHeart = $(".nav-heart");

    safeAddEvent(navHeart, "click", event => {

        createHeartBurst(
            event.clientX,
            event.clientY,
            14
        );

        showQuickMessage(
            "A little heart just for you 💗"
        );

    });

}


function scrollToTarget(target) {

    if (!target) return;

    let element = null;

    try {

        element = document.querySelector(
            target.startsWith("#")
                ? target
                : `#${target}`
        );

    } catch (error) {

        console.warn(
            "Invalid navigation target:",
            target
        );

        return;

    }

    if (!element) return;

    const navbar = $(".navbar");

    const offset =
        navbar
            ? navbar.offsetHeight + 25
            : 30;

    const position =
        element.getBoundingClientRect().top +
        window.scrollY -
        offset;

    window.scrollTo({
        top: Math.max(0, position),
        behavior: "smooth"
    });

}


/* =========================================================
   POPUPS
   ========================================================= */

function initializePopups() {

    const popups = $$(".popup, .comfort-popup");

    popups.forEach(popup => {

        const closeButton =
            $(".close-button", popup) ||
            $(".comfort-close", popup);

        safeAddEvent(
            closeButton,
            "click",
            () => closePopup(popup)
        );

        safeAddEvent(
            popup,
            "click",
            event => {

                if (event.target === popup) {
                    closePopup(popup);
                }

            }
        );

    });


    $$(".popup-action").forEach(button => {

        safeAddEvent(button, "click", () => {

            const popup =
                button.closest(".popup") ||
                button.closest(".comfort-popup");

            if (popup) {
                closePopup(popup);
            }

        });

    });

}


function openPopup(popup) {

    if (!popup) return;

    $$(".popup.show, .comfort-popup.show").forEach(
        otherPopup => {

            if (otherPopup !== popup) {
                closePopup(otherPopup);
            }

        }
    );

    popup.classList.add("show");

    popup.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

    AppState.popupOpen = true;
    AppState.currentPopup = popup;

}


function closePopup(popup) {

    if (!popup) return;

    popup.classList.remove("show");

    popup.setAttribute(
        "aria-hidden",
        "true"
    );

    const remaining =
        $(".popup.show, .comfort-popup.show");

    if (!remaining) {

        document.body.style.overflow = "";

        AppState.popupOpen = false;
        AppState.currentPopup = null;

    }

}


/* =========================================================
   COMFORT CARDS
   ========================================================= */

function initializeComfortCards() {

    const cards = $$(".cozy-card");

    cards.forEach(card => {

        safeAddEvent(card, "click", event => {

            createHeartBurst(
                event.clientX,
                event.clientY,
                8
            );

            const popupId =
                card.dataset.popup ||
                card.dataset.target;

            if (popupId) {

                const popup =
                    document.querySelector(
                        popupId.startsWith("#")
                            ? popupId
                            : `#${popupId}`
                    );

                if (popup) {
                    activatePopupContent(
                        popup,
                        card.dataset.content
                    );

                    openPopup(popup);

                    return;
                }

            }

            const title =
                card.querySelector("h3");

            const description =
                card.querySelector("p");

            if (title) {

                showComfortMessage(
                    title.textContent,
                    description
                        ? description.textContent
                        : "You deserve a little comfort today. 💗"
                );

            }

        });

    });

}


function activatePopupContent(popup, contentId) {

    if (!popup) return;

    const contents =
        $$(".popup-content", popup);

    if (!contents.length) return;

    contents.forEach(content => {
        content.classList.remove("active");
    });

    if (contentId) {

        const target =
            document.getElementById(contentId);

        if (target) {
            target.classList.add("active");
            return;
        }

    }

    contents[0].classList.add("active");

}


function showComfortMessage(title, message) {

    let popup =
        $(".comfort-popup");

    if (!popup) {
        popup = $(".popup");
    }

    if (!popup) {

        showQuickMessage(
            `${title} 💗`
        );

        return;

    }

    const heading =
        $(".popup-content.active h2", popup) ||
        $(".popup-card h2", popup);

    const paragraph =
        $(".popup-content.active p", popup) ||
        $(".popup-card p", popup);

    if (heading) {
        heading.textContent = title;
    }

    if (paragraph) {
        paragraph.textContent = message;
    }

    openPopup(popup);

}


/* =========================================================
   PERIOD COMFORT CENTER
   ========================================================= */

function initializePeriodComfort() {

    const periodButton =
        $(".period-button");

    const result =
        $(".period-result");

    if (!periodButton) return;


    const periodMessages = [

        "Take it slow today. Your comfort matters. 🌷",

        "A warm drink, cozy blanket, and some rest can make things feel a little easier. 💗",

        "You don't have to be productive every minute. Rest is allowed. 🫶",

        "Gentle movement or a warm shower may help you relax. 🌸",

        "Stay hydrated and give yourself permission to have a softer day. 💕",

        "Be kind to yourself today. You deserve patience and care. 🐰"

    ];


    safeAddEvent(
        periodButton,
        "click",
        event => {

            const message =
                periodMessages[
                    AppState.periodMessageIndex %
                    periodMessages.length
                ];

            AppState.periodMessageIndex++;

            if (result) {

                result.textContent = message;

                result.classList.remove("show");

                requestAnimationFrame(() => {

                    result.classList.add("show");

                });

            }

            createHeartBurst(
                event.clientX,
                event.clientY,
                10
            );

        }
    );

}


/* =========================================================
   CHOCOLATE
   ========================================================= */

function initializeChocolate() {

    const button =
        $(".cute-button");

    const result =
        $(".result-message");

    if (!button) return;


    const messages = [

        "Emergency chocolate delivered 🍫💗",

        "Okay okay... one chocolate break coming right up! 🍫",

        "Chocolate makes the cozy level go 📈💗",

        "You officially deserve a sweet little treat. 🥰",

        "Chocolate mode: ACTIVATED 🍫✨"

    ];


    safeAddEvent(
        button,
        "click",
        event => {

            const message =
                messages[
                    Math.floor(
                        Math.random() *
                        messages.length
                    )
                ];

            if (result) {

                result.textContent = message;

                result.animate(
                    [
                        {
                            opacity: 0,
                            transform: "translateY(8px)"
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

            createChocolateRain();

            createHeartBurst(
                event.clientX,
                event.clientY,
                12
            );

        }
    );

}


function createChocolateRain() {

    const amount = 18;

    for (let i = 0; i < amount; i++) {

        const chocolate =
            document.createElement("div");

        chocolate.className =
            "chocolate-rain";

        chocolate.textContent =
            ["🍫", "🤎", "🍬"][
                Math.floor(
                    Math.random() * 3
                )
            ];

        chocolate.style.left =
            `${Math.random() * 100}vw`;

        chocolate.style.animationDuration =
            `${1.4 + Math.random() * .9}s`;

        chocolate.style.animationDelay =
            `${Math.random() * .25}s`;

        chocolate.style.fontSize =
            `${18 + Math.random() * 14}px`;

        document.body.appendChild(chocolate);

        setTimeout(() => {

            chocolate.remove();

        }, 2600);

    }

}


/* =========================================================
   LOVE LETTER
   ========================================================= */

function initializeLoveLetter() {

    const envelope =
        $(".envelope");

    const letter =
        $(".letter");

    if (!envelope || !letter) return;


    safeAddEvent(
        envelope,
        "click",
        event => {

            AppState.letterOpen =
                !AppState.letterOpen;

            letter.classList.toggle(
                "open",
                AppState.letterOpen
            );

            envelope.setAttribute(
                "aria-expanded",
                String(AppState.letterOpen)
            );


            if (AppState.letterOpen) {

                envelope.classList.add(
                    "opened"
                );

                createHeartBurst(
                    event.clientX,
                    event.clientY,
                    16
                );

                setTimeout(() => {

                    letter.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 200);

            } else {

                envelope.classList.remove(
                    "opened"
                );

            }

        }
    );

}


/* =========================================================
   MUSIC
   ========================================================= */

function initializeMusic() {

    const player =
        $(".music-player");

    const audio =
        $(".music-player audio");

    if (!player || !audio) return;


    safeAddEvent(
        audio,
        "play",
        () => {

            player.classList.add(
                "playing"
            );

            AppState.musicPlaying = true;

        }
    );


    safeAddEvent(
        audio,
        "pause",
        () => {

            player.classList.remove(
                "playing"
            );

            AppState.musicPlaying = false;

        }
    );


    safeAddEvent(
        audio,
        "ended",
        () => {

            player.classList.remove(
                "playing"
            );

            AppState.musicPlaying = false;

        }
    );

}


/* =========================================================
   HEART INTERACTIONS
   ========================================================= */

function initializeHeartInteractions() {

    document.addEventListener(
        "click",
        event => {

            const clickable =
                event.target.closest(
                    "button, .cozy-card, .polaroid, .envelope"
                );

            if (!clickable) return;

            if (
                clickable.classList.contains(
                    "nav-heart"
                )
            ) {
                return;
            }

            if (
                clickable.classList.contains(
                    "cute-button"
                )
            ) {
                return;
            }

            if (
                clickable.classList.contains(
                    "period-button"
                )
            ) {
                return;
            }

            if (
                clickable.classList.contains(
                    "envelope"
                )
            ) {
                return;
            }

            createHeartBurst(
                event.clientX,
                event.clientY,
                5
            );

        }
    );

}


function createHeartBurst(
    x,
    y,
    amount = 8
) {

    if (
        typeof x !== "number" ||
        typeof y !== "number"
    ) {
        return;
    }


    const hearts = [
        "💗",
        "💕",
        "💖",
        "💞",
        "♡"
    ];


    for (let i = 0; i < amount; i++) {

        const heart =
            document.createElement("span");

        heart.className =
            "heart-burst";

        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            35 +
            Math.random() * 90;


        const offsetX =
            Math.cos(angle) *
            distance;

        const offsetY =
            Math.sin(angle) *
            distance;


        heart.style.left =
            `${x}px`;

        heart.style.top =
            `${y}px`;

        heart.style.setProperty(
            "--x",
            `${offsetX}px`
        );

        heart.style.setProperty(
            "--y",
            `${offsetY}px`
        );

        heart.style.setProperty(
            "--rotate",
            `${-40 + Math.random() * 80}deg`
        );


        heart.style.animationDuration =
            `${.7 + Math.random() * .6}s`;

        heart.style.fontSize =
            `${16 + Math.random() * 14}px`;


        document.body.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 1500);

    }

}


/* =========================================================
   POLAROID / MEMORY INTERACTION
   ========================================================= */

$$(".polaroid").forEach(polaroid => {

    safeAddEvent(
        polaroid,
        "click",
        event => {

            createHeartBurst(
                event.clientX,
                event.clientY,
                8
            );

        }
    );

});


$$(".memory-card").forEach(card => {

    safeAddEvent(
        card,
        "click",
        event => {

            createHeartBurst(
                event.clientX,
                event.clientY,
                8
            );

        }
    );

});


/* =========================================================
   FINAL SECTION
   ========================================================= */

function initializeFinalSection() {

    const finalButton =
        $(".final-button");

    if (!finalButton) return;


    safeAddEvent(
        finalButton,
        "click",
        event => {

            const popup =
                $(".popup");

            if (popup) {

                activatePopupContent(
                    popup
                );

                openPopup(popup);

            } else {

                showQuickMessage(
                    "You deserve all the love in the world. 💗"
                );

            }


            createHeartBurst(
                event.clientX,
                event.clientY,
                20
            );

        }
    );

}


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

function initializeKeyboardControls() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                AppState.popupOpen
            ) {

                if (
                    AppState.currentPopup
                ) {

                    closePopup(
                        AppState.currentPopup
                    );

                }

            }

        }
    );

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initializeScrollReveal() {

    const elements =
        $$(".reveal");

    if (!elements.length) return;


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

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
                threshold: 0.12,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    elements.forEach(
        element => {

            observer.observe(element);

        }
    );

}


/* =========================================================
   BACKGROUND HEARTS
   ========================================================= */

function initializeBackgroundHearts() {

    const container =
        $(".background-hearts");

    if (!container) return;


    const heartSymbols = [
        "♡",
        "♥",
        "♡",
        "💕"
    ];


    const createBackgroundHeart =
        () => {

            const heart =
                document.createElement("span");

            heart.textContent =
                heartSymbols[
                    Math.floor(
                        Math.random() *
                        heartSymbols.length
                    )
                ];


            heart.style.left =
                `${Math.random() * 100}%`;

            heart.style.fontSize =
                `${12 + Math.random() * 25}px`;

            heart.style.animationDuration =
                `${7 + Math.random() * 8}s`;

            heart.style.animationDelay =
                `${Math.random() * 2}s`;


            container.appendChild(
                heart
            );


            setTimeout(() => {

                heart.remove();

            }, 17000);

        };


    for (
        let i = 0;
        i < 10;
        i++
    ) {

        setTimeout(
            createBackgroundHeart,
            i * 500
        );

    }


    setInterval(
        createBackgroundHeart,
        1300
    );

}


/* =========================================================
   QUICK MESSAGE
   ========================================================= */

function showQuickMessage(message) {

    if (!message) return;


    let toast =
        $("#comfort-toast");


    if (!toast) {

        toast =
            document.createElement("div");

        toast.id =
            "comfort-toast";


        Object.assign(
            toast.style,
            {
                position: "fixed",
                left: "50%",
                bottom: "28px",
                transform:
                    "translate(-50%, 20px)",
                padding:
                    "13px 20px",
                borderRadius:
                    "999px",
                background:
                    "rgba(255,255,255,.94)",
                color:
                    "#d85c88",
                fontWeight:
                    "700",
                fontSize:
                    "13px",
                boxShadow:
                    "0 18px 45px rgba(120,70,100,.18)",
                border:
                    "1px solid rgba(255,255,255,.95)",
                zIndex:
                    "10000",
                opacity:
                    "0",
                pointerEvents:
                    "none",
                transition:
                    "opacity .3s ease, transform .3s ease"
            }
        );


        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;

    toast.style.opacity =
        "1";

    toast.style.transform =
        "translate(-50%, 0)";


    clearTimeout(
        toast._hideTimer
    );


    toast._hideTimer =
        setTimeout(() => {

            toast.style.opacity =
                "0";

            toast.style.transform =
                "translate(-50%, 20px)";

        }, 2600);

}


/* =========================================================
   IMAGE FALLBACKS
   ========================================================= */

function initializeImageFallbacks() {

    const images =
        $$("img");


    images.forEach(img => {

        safeAddEvent(
            img,
            "error",
            () => {

                img.classList.add(
                    "image-error"
                );

                img.alt =
                    "Comfort Place memory";


                if (
                    !img.dataset.fallbackApplied
                ) {

                    img.dataset.fallbackApplied =
                        "true";

                    img.style.objectFit =
                        "contain";

                    img.style.padding =
                        "30px";

                    img.style.background =
                        "#fff0f5";

                }

            }
        );

    });

}


/* =========================================================
   UTILITY: ADD RIPPLE EFFECT
   ========================================================= */

function addRipple(button) {

    if (!button) return;


    safeAddEvent(
        button,
        "click",
        event => {

            const rect =
                button.getBoundingClientRect();


            const ripple =
                document.createElement("span");


            ripple.className =
                "button-ripple";


            const size =
                Math.max(
                    rect.width,
                    rect.height
                );


            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;


            button.appendChild(
                ripple
            );


            setTimeout(() => {

                ripple.remove();

            }, 700);

        }
    );

}


$$(
    ".main-button, .cute-button, .comfort-button, .final-button, .period-button"
).forEach(
    addRipple
);


/* =========================================================
   SMOOTH IMAGE LOADING
   ========================================================= */

$$("img").forEach(img => {

    if (img.complete) {

        img.classList.add(
            "loaded"
        );

    } else {

        safeAddEvent(
            img,
            "load",
            () => {

                img.classList.add(
                    "loaded"
                );

            }
        );

    }

});


/* =========================================================
   DOUBLE CLICK HEART EFFECT
   ========================================================= */

$$(".memory-card, .polaroid").forEach(
    element => {

        safeAddEvent(
            element,
            "dblclick",
            event => {

                createHeartBurst(
                    event.clientX,
                    event.clientY,
                    18
                );

            }
        );

    }
);


/* =========================================================
   PREVENT ACCIDENTAL DRAGGING
   ========================================================= */

$$(
    ".nav-heart, .main-button, .cute-button, .comfort-button, .final-button, .period-button, .envelope"
).forEach(
    element => {

        element.setAttribute(
            "draggable",
            "false"
        );

    }
);


/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            AppState.musicPlaying
        ) {

            const audio =
                $(".music-player audio");

            if (audio) {
                audio.pause();
            }

        }

    }
);


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%c💗 Comfort Place loaded successfully!",
    "font-size:16px;font-weight:bold;color:#d85c88;"
);

console.log(
    "%cMade with love ✨",
    "font-size:12px;color:#987d8b;"
);


/* =========================================================
   END OF SCRIPT
   ========================================================= */
