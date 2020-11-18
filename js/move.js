'use strict';

(() => {
  const MIN_Y = 130;
  const MAX_Y = 630;
  const MIN_X = 0;
  const MAX_X = 1200;
  const mainPin = document.querySelector(`.map__pin--main`);

  mainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetTop - shift.y + window.pin.HEIGHT_MARKER >= MIN_Y && mainPin.offsetTop - shift.y + window.pin.HEIGHT_MARKER <= MAX_Y && mainPin.offsetLeft - shift.x + (window.pin.WIDTH_MARKER / 2) >= MIN_X && mainPin.offsetLeft - shift.x + (window.pin.WIDTH_MARKER / 2) <= MAX_X) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
      }
      window.pin.inputAddress.value = `${Math.floor(mainPin.offsetLeft + window.pin.WIDTH_MARKER / 2)}, ${Math.floor(mainPin.offsetTop + window.pin.HEIGHT_MARKER)}`;
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
