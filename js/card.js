'use strict';

(function () {
  const templateCard = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);

  function closeAllPopups() {
    const prevElement = document.querySelector(`.map > .map__card`);
    if (prevElement) {
      prevElement.remove();
    }
  }

  function createCard(marker) {
    closeAllPopups();
    const advertCard = templateCard.cloneNode(true);
    const cardClose = advertCard.querySelector(`.popup__close`);
    advertCard.classList.add(`map__card`);

    window.main.getSrcPhotos(marker.offer.photos, advertCard);
    advertCard.querySelector(`.popup__title`).textContent = marker.offer.title;
    advertCard.querySelector(`.popup__text--address`).textContent = marker.offer.address;
    advertCard.querySelector(`.popup__text--price`).textContent = `${marker.offer.price} ₽/ночь`;
    advertCard.querySelector(`.popup__type`).textContent = window.main.getTypePlace(marker.offer.type);
    advertCard.querySelector(`.popup__text--capacity`).textContent = `${marker.offer.rooms} комнаты для ${marker.offer.guests} гостей`;
    advertCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${marker.offer.checkin}, выезд до ${marker.offer.checkout}`;
    advertCard.querySelector(`.popup__feature`).textContent = marker.offer.features;
    advertCard.querySelector(`.popup__description`).textContent = marker.offer.description;
    advertCard.querySelector(`.popup__avatar`).src = marker.author.avatar;

    if (marker.offer.photos.length === 0) {
      advertCard.querySelector(`.popup__photos`).classList.add(`hidden`);
    }

    if (marker.offer.rooms === 0 || marker.offer.guests === 0) {
      advertCard.querySelector(`.popup__text--capacity`).classList.add(`hidden`);
    }

    if (marker.offer.features.length === 0) {
      advertCard.querySelector(`.popup__features`).classList.add(`hidden`);
    }

    function onCardCloseHandler(evt) {
      if (evt.key === `Escape` || evt.button === 0) {
        advertCard.remove();
      }
    }
    window.main.map.insertBefore(advertCard, mapFiltersContainer);

    window.addEventListener(`keydown`, onCardCloseHandler);
    cardClose.addEventListener(`click`, onCardCloseHandler);
  }

  window.card = {
    createCard
  };
})();
