'use strict';

(function () {
  const main = document.querySelector(`main`);
  const templateError = document.querySelector(`#error`).content.querySelector(`.error`);
  const templateSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
  const buttonReset = document.querySelector(`.ad-form__reset`);
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const statusCode = {
    OK: 200
  };

  function upload(data, onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        errorHandler();
      }
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  }

  window.main.adForm.addEventListener(`submit`, function (evt) {
    upload(new FormData(window.main.adForm), successHandler);
    evt.preventDefault();
  });

  function successHandler() {
    const successMessage = templateSuccess.cloneNode(true);
    successMessage.classList.add(`success`);
    main.appendChild(successMessage);
    window.addEventListener(`keydown`, onPopupSuccessEscPress);
    successMessage.addEventListener(`click`, onPopupSuccessClick);
    getDisabledPage();
  }

  function errorHandler() {
    const errorMessage = templateError.cloneNode(true);
    const errorButton = errorMessage.querySelector(`.error__button`);
    errorMessage.classList.add(`error`);
    main.appendChild(errorMessage);
    window.addEventListener(`keydown`, onPopupErrorKeydown);
    errorMessage.addEventListener(`click`, onPopupErrorClick);
    errorButton.addEventListener(`click`, onPopupErrorClick);
  }

  function closeErrorPopup() {
    const errorMessage = templateError.cloneNode(true);
    const errorButton = errorMessage.querySelector(`.error__button`);
    const errorContainer = main.querySelector(`.error`);
    errorContainer.classList.add(`hidden`);
    window.removeEventListener(`keydown`, onPopupErrorKeydown);
    errorMessage.removeEventListener(`click`, onPopupErrorClick);
    errorButton.removeEventListener(`click`, onPopupErrorClick);
  }

  function closeSuccessPopup() {
    const successContainer = main.querySelector(`.success`);
    successContainer.remove();
    window.removeEventListener(`keydown`, onPopupSuccessEscPress);
  }

  function onPopupSuccessEscPress(evt) {
    if (evt.keyCode === window.main.ESC_KEYCODE) {
      closeSuccessPopup();
    }
  }

  function onPopupSuccessClick() {
    closeSuccessPopup();
  }

  function onPopupErrorKeydown(evt) {
    if (evt.keyCode === window.main.ESC_KEYCODE) {
      evt.preventDefault();
      closeErrorPopup();
    }
  }

  function onPopupErrorClick(evt) {
    evt.preventDefault();
    closeErrorPopup();
  }

  function getDisabledPage() {
    window.pin.mapPinMain.style = `top: 375px; left: 570px`;
    window.main.map.classList.add(`map--faded`);
    window.main.adForm.classList.add(`ad-form--disabled`);
    window.main.delPrevElements();
    window.card.closeAllPopups();
    window.main.adForm.reset();
    window.main.mapForm.reset();
    window.main.toggleDisabledInput(window.main.adFormChildren);
    window.main.toggleDisabledInput(window.main.mapFiltersFormChildren);
    window.pin.inputAddress.value = `${window.pin.mapPinMain.offsetLeft + window.pin.WIDTH_MAIN_MARKER / 2}, ${window.pin.mapPinMain.offsetTop + window.pin.HEIGHT_MAIN_MARKER / 2}`;
    window.pin.mapPinMain.addEventListener(`mousedown`, window.pin.onPinActiveClick);
    window.pin.mapPinMain.addEventListener(`keydown`, window.pin.onPinActiveKeydown);
  }

  buttonReset.addEventListener(`click`, function () {
    getDisabledPage();
  });
})();
