'use strict';

(function () {
  const templateCard = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);

  const closeAllPopups = () => {
    const prevElement = document.querySelector(`.map > .map__card`);
    const cardButton = document.querySelector(`.popup__close`);
    if (prevElement) {
      window.removeEventListener(`keydown`, onCardCKeydown);
      cardButton.removeEventListener(`click`, onCardClick);
      prevElement.remove();
    }
  };

  const createCard = (marker) => {
    closeAllPopups();
    const advertCard = templateCard.cloneNode(true);
    const cardCloseButton = advertCard.querySelector(`.popup__close`);
    advertCard.classList.add(`map__card`);

    advertCard.querySelector(`.popup__title`).textContent = marker.offer.title;
    advertCard.querySelector(`.popup__text--address`).textContent = marker.offer.address;
    advertCard.querySelector(`.popup__text--price`).textContent = `${marker.offer.price} ₽/ночь`;
    advertCard.querySelector(`.popup__type`).textContent = window.main.getTypePlace(marker.offer.type);
    advertCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${marker.offer.checkin}, выезд до ${marker.offer.checkout}`;
    advertCard.querySelector(`.popup__description`).textContent = marker.offer.description;
    advertCard.querySelector(`.popup__avatar`).src = marker.author.avatar;

    if (marker.offer.photos.length === 0) {
      advertCard.querySelector(`.popup__photos`).classList.add(`hidden`);
    } else {
      window.main.getSrcPhotos(marker.offer.photos, advertCard);
    }

    if (marker.offer.rooms === 0 || marker.offer.guests === 0) {
      advertCard.querySelector(`.popup__text--capacity`).classList.add(`hidden`);
    } else {
      advertCard.querySelector(`.popup__text--capacity`).textContent = `${marker.offer.rooms} комнаты для ${marker.offer.guests} гостей`;
    }

    if (marker.offer.features.length === 0) {
      advertCard.querySelector(`.popup__features`).classList.add(`hidden`);
    } else {
      Array.from(advertCard.querySelector(`.popup__features`).children).forEach((child) => {
        if (!marker.offer.features.includes(child.dataset.feature)) {
          child.remove();
        }
      });
    }

    window.main.map.insertBefore(advertCard, mapFiltersContainer);

    window.addEventListener(`keydown`, onCardCKeydown);
    cardCloseButton.addEventListener(`click`, onCardClick);
  };

  const onCardCKeydown = (evt) => {
    if (evt.keyCode === window.main.ESC_KEYCODE || evt.keyCode === window.main.ENTER_KEYCODE) {
      closeCard();
    }
  };

  const onCardClick = (evt) => {
    if (evt.button === window.main.BUTTON_LEFT_CODE) {
      closeCard();
    }
  };

  const closeCard = () => {
    const activeCard = document.querySelector(`.map__card`);
    const cardButton = activeCard.querySelector(`.popup__close`);
    const shownPins = window.main.map.querySelectorAll(`.map__pin`);
    shownPins.forEach((pin) => {
      pin.classList.remove(`map__pin--active`);
    });
    window.removeEventListener(`keydown`, onCardCKeydown);
    cardButton.removeEventListener(`click`, onCardClick);
    activeCard.remove();
  };
  window.card = {
    createCard,
    closeAllPopups
  };
})();
