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

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (window.pin.mapPinMain.offsetTop - shift.y >= MIN_Y && window.pin.mapPinMain.offsetTop - shift.y <= MAX_Y) {
        window.pin.mapPinMain.style.top = (window.pin.mapPinMain.offsetTop - shift.y) + `px`;
        window.pin.mapPinMain.style.left = (window.pin.mapPinMain.offsetLeft - shift.x) + `px`;
      }

      window.pin.inputAddress.value = `${startCoords.x + window.pin.WIDTH_MAIN_MARKER / 2}, ${startCoords.y + window.pin.HEIGHT_MAIN_MARKER / 2}`;
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
