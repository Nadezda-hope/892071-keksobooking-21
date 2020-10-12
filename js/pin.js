'use strict';

(function () {
  const main = document.querySelector(`main`);
  const mapPins = window.main.map.querySelector(`.map__pins`);
  const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const templateError = document.querySelector(`#error`).content.querySelector(`.error`);
  const templateSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
  const WIDTH_MARKER = 65;
  const HEIGHT_MARKER = 87;

  const inputAddress = window.main.adForm.querySelector(`input[name="address"]`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const coordPinTop = mapPinMain.offsetTop;
  const coordPinLeft = mapPinMain.offsetLeft;
  inputAddress.value = `${coordPinTop + WIDTH_MARKER / 2}, ${coordPinLeft + WIDTH_MARKER / 2}`;

  function getMarkers(markers) {
    for (let i = 0; i < markers.length; i++) {
      const currentMarker = markers[i];
      let markerElement = templatePin.cloneNode(true);
      markerElement.classList.add(`map__pin`);

      markerElement.style.left = `${currentMarker.location.x - (WIDTH_MARKER / 2)}px`;
      markerElement.style.top = `${currentMarker.location.y - HEIGHT_MARKER}px`;
      markerElement.querySelector(`img`).src = currentMarker.author.avatar;
      markerElement.querySelector(`img`).alt = currentMarker.offer.title;

      mapPins.appendChild(markerElement);
    }
  }

  function successHandler() {
    let successMessage = templateSuccess.cloneNode(true);
    successMessage.classList.add(`success`);
    main.appendChild(successMessage);
  }

  function errorHandler() {
    let errorMessage = templateError.cloneNode(true);
    errorMessage.classList.add(`error`);
    main.appendChild(errorMessage);
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
      window.load(showPage, errorHandler);
      inputAddress.value = `${coordPinTop + HEIGHT_MARKER}, ${coordPinLeft + WIDTH_MARKER / 2}`;
    }
  }

  mapPinMain.addEventListener(`mousedown`, onPinActiveHandler);
  mapPinMain.addEventListener(`keydown`, onPinActiveHandler);

  window.pin = {
    getMarkers,
    successHandler,
    errorHandler,
    WIDTH_MARKER,
    HEIGHT_MARKER
  };
})();
