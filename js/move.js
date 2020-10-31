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

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.pin.mapPinMain.style.top = (window.pin.mapPinMain.offsetTop - shift.y) + `px`;
      window.pin.mapPinMain.style.left = (window.pin.mapPinMain.offsetLeft - shift.x) + `px`;
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
