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
    window.addEventListener(`keydown`, onPopupEscPress);
    successMessage.addEventListener(`click`, onPopupEscPress);
    getDisabledPage();
  }

  function errorHandler() {
    const errorMessage = templateError.cloneNode(true);
    errorMessage.classList.add(`error`);
    main.appendChild(errorMessage);
    window.addEventListener(`keydown`, onPopupErrorHandler);
    errorMessage.addEventListener(`click`, onPopupErrorHandler);
    const errorButton = errorMessage.querySelector(`.error__button`);
    errorButton.addEventListener(`mousedown`, onPopupErrorHandler);
  }

  function closeErrorPopup() {
    const errorContainer = main.querySelector(`.error`);
    errorContainer.remove();
    window.removeEventListener(`keydown`, onPopupErrorHandler);
  }

  function closeSuccessPopup() {
    const successContainer = main.querySelector(`.success`);
    successContainer.remove();
    window.removeEventListener(`keydown`, onPopupEscPress);
  }

  function onPopupEscPress(evt) {
    if (evt.key === `Escape` || evt.button === 0) {
      closeSuccessPopup();
    }
  }

  function onPopupErrorHandler(evt) {
    if (evt.key === `Escape` || evt.button === 0) {
      evt.preventDefault();
      closeErrorPopup();
    }
  }

  function getDisabledPage() {
    window.pin.mapPinMain.style = `top: 375px; left: 570px`;
    window.main.map.classList.add(`map--faded`);
    window.main.adForm.classList.add(`ad-form--disabled`);
    window.main.delPrevElements();
    window.card.closeAllPopups();
    window.main.adForm.reset();
    window.main.mapForm.reset();
    window.main.toggleDisabledInput(window.main.adForm);
    window.main.toggleDisabledInput(window.main.mapForm);
    window.pin.mapPinMain.addEventListener(`mousedown`, window.pin.onPinActiveHandler);
    window.pin.mapPinMain.addEventListener(`keydown`, window.pin.onPinActiveHandler);
  }

  buttonReset.addEventListener(`click`, function () {
    getDisabledPage();
  });
})();
