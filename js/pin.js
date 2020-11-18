'use strict';

(() => {
  const WIDTH_MAIN_MARKER = 200;
  const HEIGHT_MAIN_MARKER = 200;
  const WIDTH_MARKER = 65;
  const HEIGHT_MARKER = 70;
  const MAX_SIMILAR_MARKERS = 5;
  const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const inputAddress = window.main.adForm.querySelector(`input[name="address"]`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const coordPinTop = mapPinMain.offsetTop;
  const coordPinLeft = mapPinMain.offsetLeft;
  inputAddress.value = `${Math.floor(coordPinLeft + WIDTH_MAIN_MARKER / 2)}, ${Math.floor(coordPinTop + HEIGHT_MAIN_MARKER / 2)}`;

  const getMarkers = (markers) => {
    let amount = markers.length > MAX_SIMILAR_MARKERS ? MAX_SIMILAR_MARKERS : markers.length;
    for (let i = 0; i < amount; i++) {
      const currentMarker = markers[i];
      const markerElement = templatePin.cloneNode(true);
      markerElement.classList.add(`map__pin`);

      markerElement.style.left = `${currentMarker.location.x - (WIDTH_MARKER / 2)}px`;
      markerElement.style.top = `${currentMarker.location.y - HEIGHT_MARKER}px`;
      markerElement.querySelector(`img`).src = currentMarker.author.avatar;
      markerElement.querySelector(`img`).alt = currentMarker.offer.title;
      window.main.mapPins.appendChild(markerElement);

      if (currentMarker.offer === 0) {
        markerElement.classList.add(`hidden`);
      }

      markerElement.addEventListener(`click`, () => {
        const currentActivePin = window.main.map.querySelector(`.map__pin--active`);
        if (currentActivePin) {
          currentActivePin.classList.remove(`map__pin--active`);
        }
        markerElement.classList.add(`map__pin--active`);
        window.card.createCard(currentMarker);
      });
    }
  };

  const showPage = (data) => {
    window.main.mapMarkers = data;
    window.main.map.classList.remove(`map--faded`);
    window.main.adForm.classList.remove(`ad-form--disabled`);
    getMarkers(window.main.mapMarkers);
    window.main.toggleDisabledInput(window.main.adFormChildren);
    window.main.toggleDisabledInput(window.main.mapFiltersFormChildren);
    mapPinMain.removeEventListener(`mousedown`, onPinActiveClick);
    mapPinMain.removeEventListener(`keydown`, onPinActiveKeydown);
  };

  const onPinActiveKeydown = (evt) => {
    if (evt.keyCode === window.main.ENTER_KEYCODE) {
      window.load.load(showPage, window.main.createErrorWarning);
      inputAddress.value = `${Math.floor(coordPinLeft + WIDTH_MARKER / 2)}, ${Math.floor(coordPinTop + HEIGHT_MARKER)}`;
    }
  };

  const onPinActiveClick = (evt) => {
    if (evt.button === window.main.BUTTON_LEFT_CODE) {
      window.load.load(showPage, window.main.createErrorWarning);
      inputAddress.value = `${Math.floor(coordPinLeft + WIDTH_MARKER / 2)}, ${Math.floor(coordPinTop + HEIGHT_MARKER)}`;
    }
  };

  mapPinMain.addEventListener(`mousedown`, onPinActiveClick);
  mapPinMain.addEventListener(`keydown`, onPinActiveKeydown);

  window.pin = {
    inputAddress,
    getMarkers,
    onPinActiveClick,
    onPinActiveKeydown,
    WIDTH_MAIN_MARKER,
    HEIGHT_MAIN_MARKER,
    WIDTH_MARKER,
    HEIGHT_MARKER,
    mapPinMain,
  };
})();
