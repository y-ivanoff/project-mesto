import { initialCards } from './cards.js';
// DOM узлы
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
const addCardButton = document.querySelector('.profile__add-button');
const profilePopupClose = profilePopup.querySelector('.popup__close');
const cardPopupClose = cardPopup.querySelector('.popup__close');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');
const placesList = document.querySelector('.places__list');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupClose = imagePopup.querySelector('.popup__close');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const popupImage = imagePopup.querySelector('.popup__image');

addCardButton.addEventListener('click', () => {
    openModal(cardPopup);
});

profileEditButton.addEventListener('click', () => {
    openModal(profilePopup);
});

profilePopupClose.addEventListener('click', () => {
    closeModal(profilePopup);
});

cardPopupClose.addEventListener('click', () => {
    closeModal(cardPopup);
});
imagePopupClose.addEventListener('click', () => {
    closeModal(imagePopup);
});

function openModal(popup){
    fillProfileForm();
    popup.classList.add('popup_is-opened');
}

function closeModal(popup){
    popup.classList.remove('popup_is-opened');
}

function fillProfileForm(){
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent; 
}

function handleProfileFormSubmit(evt){
    evt.preventDefault();

    const nameValue = nameInput.value;
    const descriptionValue = descriptionInput.value;

    profileTitle.textContent = nameValue;
    profileDescription.textContent = descriptionValue;

    closeModal(profilePopup);
}
profilePopup.addEventListener('submit', handleProfileFormSubmit);

function handleCardFormSubmit(evt){
    evt.preventDefault();

    const newCard = {
        name: cardNameInput.value,
        link: cardLinkInput.value
      };

    const cardElement = createCard(newCard);
    placesList.prepend(cardElement);

    closeModal(cardPopup);
    evt.target.reset();
}

cardPopup.addEventListener('submit', handleCardFormSubmit);

function createCard(cardData){
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardImage.addEventListener('click', () => {
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        imagePopupCaption.textContent = cardData.name;
        openModal(imagePopup);
    });
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });
    deleteButton.addEventListener('click', (evt) => {
        evt.target.closest('.card').remove();
    });
    return cardElement;
}

function renderCards(cardsData){
    cardsData.forEach(element => {
        const newCard = createCard(element);
        placesList.append(newCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.popup').forEach(popup => {
        popup.classList.add('popup_is-animated');
    });

    renderCards(initialCards);
  });