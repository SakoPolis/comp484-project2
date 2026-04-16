interface PetInfo {
  name: string;
  weight: number;
  happiness: number;
}

const petInfo: PetInfo = {
  name: "Discord Kitten",
  weight: 12,
  happiness: 8,
};

$(function (): void {
  checkAndUpdatePetInfoInHtml();

  $(".treat-button").on("click", clickedTreatButton);
  $(".play-button").on("click", clickedPlayButton);
  $(".exercise-button").on("click", clickedExerciseButton);
});

function clickedTreatButton(): void {
  petInfo.happiness += 1;
  petInfo.weight += 1;
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton(): void {
  petInfo.happiness += 2;
  petInfo.weight -= 1;
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton(): void {
  petInfo.happiness -= 1;
  petInfo.weight -= 2;
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
}

function updatePetInfoInHtml(): void {
  $(".name").text(petInfo.name);
  $(".weight").text(petInfo.weight);
  $(".happiness").text(petInfo.happiness);
}
