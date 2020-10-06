'use strict';

(function () {
  const inputAddress = window.main.adForm.querySelector(`input[name="address"]`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const coordPinTop = mapPinMain.offsetTop;
  const coordPinLeft = mapPinMain.offsetLeft;
  inputAddress.value = `${coordPinTop + window.pin.WIDTH_MARKER / 2}, ${coordPinLeft + window.pin.WIDTH_MARKER / 2}`;

  function showPage() {
    window.main.map.classList.remove(`map--faded`);
    window.main.adForm.classList.remove(`ad-form--disabled`);
    window.pin.getMarkers(window.data.adverts);
    window.main.toggleDisabledInput(window.main.adFormChildren);
    window.main.toggleDisabledInput(window.main.mapFiltersFormChildren);
    mapPinMain.removeEventListener(`mousedown`, onPinsClick);
    mapPinMain.removeEventListener(`keydown`, onPinsEnterPress);
  }

  function onPinsClick(evt) {
    if (evt.button === 0) {
      showPage();
      inputAddress.value = `${coordPinTop + window.pin.HEIGHT_MARKER}, ${coordPinLeft + window.pin.WIDTH_MARKER / 2}`;
    }
  }

  function onPinsEnterPress(evt) {
    if (evt.key === `Enter`) {
      showPage();
      inputAddress.value = `${coordPinTop + window.pin.HEIGHT_MARKER}, ${coordPinLeft + window.pin.WIDTH_MARKER / 2}`;
    }
  }

  mapPinMain.addEventListener(`mousedown`, onPinsClick);
  mapPinMain.addEventListener(`keydown`, onPinsEnterPress);
})();
