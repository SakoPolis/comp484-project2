"use strict";
const petInfo = {
    name: "Discord Kitten",
    weight: 12,
    happiness: 8,
    distance: 10,
};
$(function () {
    checkAndUpdatePetInfoInHtml();
    $(".treat-button").on("click", clickedTreatButton);
    $(".play-button").on("click", clickedPlayButton);
    $(".exercise-button").on("click", clickedExerciseButton);
    $(".call-button").on("click", clickedCallButton);
});
function animateButton(buttonSelector) {
    const $button = $(buttonSelector);
    $button.addClass("animating");
    setTimeout(() => {
        $button.removeClass("animating");
    }, 600);
}
function clickedTreatButton() {
    animateButton(".treat-button");
    petInfo.happiness += 1;
    petInfo.weight += 1;
    checkAndUpdatePetInfoInHtml();
}
function clickedPlayButton() {
    animateButton(".play-button");
    petInfo.happiness += 2;
    petInfo.weight -= 1;
    checkAndUpdatePetInfoInHtml();
}
function clickedExerciseButton() {
    animateButton(".exercise-button");
    petInfo.happiness -= 1;
    petInfo.weight -= 2;
    checkAndUpdatePetInfoInHtml();
}
function clickedCallButton() {
    animateButton(".call-button");
    petInfo.happiness += 1;
    petInfo.distance -= 2;
    checkAndUpdatePetInfoInHtml();
}
function checkAndUpdatePetInfoInHtml() {
    checkWeightAndHappinessBeforeUpdating();
    updatePetInfoInHtml();
}
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
function updatePetInfoInHtml() {
    $(".name").text(petInfo.name);
    $(".weight").text(petInfo.weight);
    $(".happiness").text(petInfo.happiness);
    $(".distance").text(petInfo.distance);
}
//# sourceMappingURL=script.js.map