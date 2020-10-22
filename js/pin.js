'use strict';

(function () {
  const mapPins = window.main.map.querySelector(`.map__pins`);
  const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const WIDTH_MARKER = 65;
  const HEIGHT_MARKER = 87;

  const inputAddress = window.main.adForm.querySelector(`input[name="address"]`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const coordPinTop = mapPinMain.offsetTop;
  const coordPinLeft = mapPinMain.offsetLeft;
  inputAddress.value = `${coordPinTop + WIDTH_MARKER / 2}, ${coordPinLeft + WIDTH_MARKER / 2}`;

  const templateCard = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);


  function getMarkers(markers) {
    for (let i = 0; i < markers.length; i++) {
      let currentMarker = markers[i];
      let markerElement = templatePin.cloneNode(true);
      markerElement.classList.add(`map__pin`);

      markerElement.style.left = `${currentMarker.location.x - (WIDTH_MARKER / 2)}px`;
      markerElement.style.top = `${currentMarker.location.y - HEIGHT_MARKER}px`;
      markerElement.querySelector(`img`).src = currentMarker.author.avatar;
      markerElement.querySelector(`img`).alt = currentMarker.offer.title;

      mapPins.appendChild(markerElement);

      markerElement.addEventListener(`click`, function () {
        createCard(currentMarker);
      });
    }
  }


  function createCard(markers) {
    let advertCard = templateCard.cloneNode(true);
    advertCard.classList.add(`map__card`);

    function getSrcPhotos(photos) {
      let photoItem = advertCard.querySelector(`.popup__photo`);
      let photosContainer = advertCard.querySelector(`.popup__photos`);
      photoItem.src = photos[0];
      for (let i = 1; i < photos.length; i++) {
        let photo = photoItem.cloneNode(true);
        photo.src = photos[i];
        photosContainer.appendChild(photo);
      }
    }
    getSrcPhotos(markers.offer.photos);
    advertCard.querySelector(`.popup__title`).textContent = markers.offer.title;
    advertCard.querySelector(`.popup__text--address`).textContent = markers.offer.address;
    advertCard.querySelector(`.popup__text--price`).textContent = `${markers.offer.price} ₽/ночь`;
    advertCard.querySelector(`.popup__type`).textContent = window.main.getTypePlace(markers.offer.type);
    advertCard.querySelector(`.popup__text--capacity`).textContent = `${markers.offer.rooms} комнаты для ${markers.offer.guests} гостей`;
    advertCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${markers.offer.checkin}, выезд до ${markers.offer.checkout}`;
    advertCard.querySelector(`.popup__features`).textContent = markers.offer.features;
    advertCard.querySelector(`.popup__description`).textContent = markers.offer.description;
    advertCard.querySelector(`.popup__avatar`).src = markers.author.avatar;
    window.main.map.insertBefore(advertCard, mapFiltersContainer);

    if (markers.offer.photos.length === 0) {
      advertCard.querySelector(`.popup__photos`).classList.add(`hidden`);
    } if (markers.offer.rooms === 0 || markers.offer.guests === 0) {
      advertCard.querySelector(`.popup__text--capacity`).classList.add(`hidden`);
    } if (markers.offer.features.length === 0) {
      advertCard.querySelector(`.popup__features`).classList.add(`hidden`);
    }
  }

  function showPage(markers) {
    window.main.map.classList.remove(`map--faded`);
    window.main.adForm.classList.remove(`ad-form--disabled`);
    getMarkers(markers);
    window.main.toggleDisabledInput(window.main.adFormChildren);
    window.main.toggleDisabledInput(window.main.mapFiltersFormChildren);
    mapPinMain.removeEventListener(`mousedown`, onPinActiveHandler);
    mapPinMain.removeEventListener(`keydown`, onPinActiveHandler);
  }

  function onPinActiveHandler(evt) {
    if (evt.button === 0 || evt.key === `Enter`) {
      window.load(showPage, window.main.createErrorWarning);
      inputAddress.value = `${coordPinTop + HEIGHT_MARKER}, ${coordPinLeft + WIDTH_MARKER / 2}`;
    }
  }

  mapPinMain.addEventListener(`mousedown`, onPinActiveHandler);
  mapPinMain.addEventListener(`keydown`, onPinActiveHandler);

  window.pin = {
    getMarkers,
    WIDTH_MARKER,
    HEIGHT_MARKER
  };
})();
