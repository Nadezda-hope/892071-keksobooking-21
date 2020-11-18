'use strict';

(function () {
  window.pin.mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      const MIN_Y = 130;
      const MAX_Y = 630;
      const MIN_X = 0;
      const MAX_X = 1200;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (window.pin.mapPinMain.offsetTop - shift.y + window.pin.HEIGHT_MARKER >= MIN_Y && window.pin.mapPinMain.offsetTop - shift.y + window.pin.HEIGHT_MARKER <= MAX_Y && window.pin.mapPinMain.offsetLeft - shift.x + (window.pin.WIDTH_MARKER / 2) >= MIN_X && window.pin.mapPinMain.offsetLeft - shift.x + (window.pin.WIDTH_MARKER / 2) <= MAX_X) {
        window.pin.mapPinMain.style.top = (window.pin.mapPinMain.offsetTop - shift.y) + `px`;
        window.pin.mapPinMain.style.left = (window.pin.mapPinMain.offsetLeft - shift.x) + `px`;
      }
      window.pin.inputAddress.value = `${Math.floor(window.pin.mapPinMain.offsetLeft + window.pin.WIDTH_MARKER / 2)}, ${Math.floor(window.pin.mapPinMain.offsetTop + window.pin.HEIGHT_MARKER)}`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
