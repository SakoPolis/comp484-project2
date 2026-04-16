"use strict";
// Initial values shown when the page first loads.
const petInfo = {
    name: "Discord Kitten",
    weight: 12,
    happiness: 8,
    distance: 10,
};
// Reused audio instance so repeated clicks restart the same ringtone.
let callSound = new Audio("sounds/rare-discord-ringtone.mp3");
let hasAppliedAudioFallback = false;
// jQuery-ready block: bind button actions and render initial state.
$(function () {
    checkAndUpdatePetInfoInHtml();
    initializeCallSoundControls();
    $(".treat-button").bind("click", clickedTreatButton);
    // Modern equivalent: $(".treat-button").on("click", clickedTreatButton);
    $(".button-container").delegate(".play-button", "click", clickedPlayButton);
    // Modern equivalent: $(".button-container").on("click", ".play-button", clickedPlayButton);
    $(".exercise-button").on("click", clickedExerciseButton);
    $(".call-button").on("click", clickedCallButton);
});
function initializeCallSoundControls() {
    const $volumeInput = $("#call-volume");
    const $muteToggle = $("#call-mute");
    $volumeInput.on("input change", function () {
        const sliderValue = Number($(this).val());
        if (!Number.isNaN(sliderValue)) {
            callSound.volume = Math.min(1, Math.max(0, sliderValue));
        }
    });
    $muteToggle.on("change", function () {
        callSound.muted = Boolean($(this).prop("checked"));
    });
}
async function applyCallAudioFallbackIfNeeded() {
    if (hasAppliedAudioFallback) {
        return;
    }
    hasAppliedAudioFallback = true;
    try {
        const response = await fetch("sounds/rare-discord-ringtone.mp3");
        const audioBuffer = await response.arrayBuffer();
        const remuxedBlob = new Blob([audioBuffer], { type: "audio/mpeg" });
        const remuxedUrl = URL.createObjectURL(remuxedBlob);
        const replacementSound = new Audio(remuxedUrl);
        replacementSound.volume = callSound.volume;
        replacementSound.muted = callSound.muted;
        callSound = replacementSound;
    }
    catch (_a) {
        // Keep the original source if fallback preparation fails.
    }
}
// Adds and removes a temporary CSS class to trigger button animations.
function animateButton(buttonSelector) {
    const $button = $(buttonSelector);
    $button.addClass("animating");
    setTimeout(() => {
        $button.removeClass("animating");
    }, 600);
}
// Treat increases both happiness and weight.
function clickedTreatButton() {
    animateButton(".treat-button");
    petInfo.happiness += 1;
    petInfo.weight += 1;
    checkAndUpdatePetInfoInHtml();
}
// Play boosts happiness but burns a little weight.
function clickedPlayButton() {
    animateButton(".play-button");
    petInfo.happiness += 2;
    petInfo.weight -= 1;
    checkAndUpdatePetInfoInHtml();
}
// Exercise lowers both happiness and weight.
function clickedExerciseButton() {
    animateButton(".exercise-button");
    petInfo.happiness -= 1;
    petInfo.weight -= 2;
    checkAndUpdatePetInfoInHtml();
}
// Call brings the pet closer by reducing distance.
function clickedCallButton() {
    animateButton(".call-button");
    callSound.currentTime = 0;
    void callSound.play().catch(() => {
        // Fallback for environments that reject the original MIME/container combo.
        void applyCallAudioFallbackIfNeeded().then(() => {
            callSound.currentTime = 0;
            void callSound.play().catch(() => {
                // Ignore secondary failures (for example, temporary autoplay policy blocks).
            });
        });
    });
    petInfo.happiness += 1;
    petInfo.distance -= 2;
    checkAndUpdatePetInfoInHtml();
}
// Single update pipeline keeps data checks and UI rendering consistent.
function checkAndUpdatePetInfoInHtml() {
    checkWeightAndHappinessBeforeUpdating();
    updatePetInfoInHtml();
}
// Prevents stats from dropping below zero.
function checkWeightAndHappinessBeforeUpdating() {
    if (petInfo.weight < 0) {
        petInfo.weight = 0;
    }
    if (petInfo.happiness < 0) {
        petInfo.happiness = 0;
    }
    if (petInfo.distance < 0) {
        petInfo.distance = 0;
    }
}
// Renders the latest stats and swaps the image based on happiness.
function updatePetInfoInHtml() {
    $(".name").text(petInfo.name);
    $(".weight").text(petInfo.weight);
    $(".happiness").text(petInfo.happiness);
    $(".distance").text(petInfo.distance);
    // Show a treat image when happiness is high; otherwise show the kitten.
    if (petInfo.happiness > 30) {
        $(".pet-image").attr("src", "images/treat.png");
        $(".pet-image").attr("alt", "A treat for your kitten");
    }
    else {
        $(".pet-image").attr("src", "images/kitten.png");
        $(".pet-image").attr("alt", "A discord kitten");
    }
}
//# sourceMappingURL=script.js.map