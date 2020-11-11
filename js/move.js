'use strict';

(function () {
  window.pin.mapPinMain.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
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
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      window.main.map.removeEventListener(`mousemove`, onMouseMove);
      window.main.map.removeEventListener(`mouseup`, onMouseUp);
    }

    window.main.map.addEventListener(`mousemove`, onMouseMove);
    window.main.map.addEventListener(`mouseup`, onMouseUp);
  });
})();
