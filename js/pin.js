'use strict';

(function () {
  const templatePin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const WIDTH_MARKER = 65;
  const HEIGHT_MARKER = 87;

  const inputAddress = window.main.adForm.querySelector(`input[name="address"]`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const coordPinTop = mapPinMain.offsetTop;
  const coordPinLeft = mapPinMain.offsetLeft;
  inputAddress.value = `${coordPinTop + WIDTH_MARKER / 2}, ${coordPinLeft + WIDTH_MARKER / 2}`;

  let mapMarkers = [];
  const MAX_SIMILAR_MARKERS = 5;
  const mapSelectType = document.querySelector(`#housing-type`);

  function updateMarkers(typeOfHouse) {
    const prevPins = document.querySelectorAll(`.map__pin`);
    for (let i = 1; i < prevPins.length; i++) {
      prevPins[i].remove();
    }

    const sameTypeOfHouse = mapMarkers.filter(function (marker) {
      return marker.offer.type === typeOfHouse;
    });

    getMarkers(sameTypeOfHouse);
  }

  mapSelectType.addEventListener(`change`, function (evt) {
    const typeOfHouse = evt.target.value;
    updateMarkers(typeOfHouse);
    window.card.closeAllPopups();
  });

  function getMarkers(markers) {
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

      markerElement.addEventListener(`click`, function () {
        window.card.createCard(currentMarker);
      });
    }
  }

  function showPage(data) {
    mapMarkers = data;
    window.main.map.classList.remove(`map--faded`);
    window.main.adForm.classList.remove(`ad-form--disabled`);
    getMarkers(mapMarkers);
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
    HEIGHT_MARKER,
    templatePin,
    mapPinMain
  };
})();
