interface PetInfo {
  name: string;
  weight: number;
  happiness: number;
  distance: number;
}

const petInfo: PetInfo = {
  name: "Discord Kitten",
  weight: 12,
  happiness: 8,
  distance: 10,
};

$(function (): void {
  checkAndUpdatePetInfoInHtml();

  $(".treat-button").on("click", clickedTreatButton);
  $(".play-button").on("click", clickedPlayButton);
  $(".exercise-button").on("click", clickedExerciseButton);
  $(".call-button").on("click", clickedCallButton);
});

function animateButton(buttonSelector: string): void {
  const $button = $(buttonSelector);
  $button.addClass("animating");
  setTimeout(() => {
    $button.removeClass("animating");
  }, 600);
}

function clickedTreatButton(): void {
  animateButton(".treat-button");
  petInfo.happiness += 1;
  petInfo.weight += 1;
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton(): void {
  animateButton(".play-button");
  petInfo.happiness += 2;
  petInfo.weight -= 1;
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton(): void {
  animateButton(".exercise-button");
  petInfo.happiness -= 1;
  petInfo.weight -= 2;
  checkAndUpdatePetInfoInHtml();
}

function clickedCallButton(): void {
  animateButton(".call-button");
  petInfo.happiness += 1;
  petInfo.distance -= 2;
  checkAndUpdatePetInfoInHtml();
}

function checkAndUpdatePetInfoInHtml(): void {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating(): void {
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

function updatePetInfoInHtml(): void {
  $(".name").text(petInfo.name);
  $(".weight").text(petInfo.weight);
  $(".happiness").text(petInfo.happiness);
  $(".distance").text(petInfo.distance);
}
