const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const createCard = (cardData, deleteCallback) => {
  const cardElements = cardTemplate.cloneNode(true);
  const cardImage = cardElements.querySelector(".card__image");
  const cardTitle = cardElements.querySelector(".card__title");
  const deleteButton = cardElements.querySelector(".card__delete-button");
  const simpleCardElement = cardElements.querySelector(".card");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  deleteButton.addEventListener("click", () => deleteCard(simpleCardElement));
  return cardElements;
};
const deleteCard = (card) => {
  card.remove();
};
initialCards.forEach((card) => {
  const newCard = createCard(card, deleteCard);
  placesList.append(newCard);
});
