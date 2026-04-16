"use strict";
const petInfo = {
    name: "Discord Kitten",
    weight: 12,
    happiness: 8,
};
$(function () {
    checkAndUpdatePetInfoInHtml();
    $(".treat-button").on("click", clickedTreatButton);
    $(".play-button").on("click", clickedPlayButton);
    $(".exercise-button").on("click", clickedExerciseButton);
});
function clickedTreatButton() {
    petInfo.happiness += 1;
    petInfo.weight += 1;
    checkAndUpdatePetInfoInHtml();
}
function clickedPlayButton() {
    petInfo.happiness += 2;
    petInfo.weight -= 1;
    checkAndUpdatePetInfoInHtml();
}
function clickedExerciseButton() {
    petInfo.happiness -= 1;
    petInfo.weight -= 2;
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
}
function updatePetInfoInHtml() {
    $(".name").text(petInfo.name);
    $(".weight").text(petInfo.weight);
    $(".happiness").text(petInfo.happiness);
}
//# sourceMappingURL=script.js.map