'use strict';

(function () {
  const main = document.querySelector(`main`);
  const errorPopup = document.querySelector(`.error`);
  const templateError = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorButton = document.querySelector(`.error__button`);
  const successPopup = document.querySelector(`.success`);
  const templateSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const statusCode = {
    OK: 200
  };

  function successHandler() {
    let successMessage = templateSuccess.cloneNode(true);
    successMessage.classList.add(`success`);
    main.appendChild(successMessage);
  }

  function errorHandler() {
    let errorMessage = templateError.cloneNode(true);
    errorMessage.classList.add(`error`);
    main.appendChild(errorMessage);
  }

  function upload(data, onSuccess) {
    let xhr = new XMLHttpRequest();
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
    upload(new FormData(window.main.adForm, successHandler));
    evt.preventDefault();
  });

  function closeErrorPopup() {
    errorPopup.classList.add(`hidden`);
    errorPopup.removeEventListener(`mousedown`, onPopupErrorHandler);
    errorPopup.removeEventListener(`keydown`, onPopupErrorHandler);
  }

  function closeSeccessPopup() {
    successPopup.classList.add(`hidden`);
    successPopup.removeEventListener(`keydown`, onPopupEscPress);
  }

  function onPopupEscPress(evt) {
    if (evt.key === `Escape`) {
      closeSeccessPopup();
    }
  }

  function onPopupErrorHandler(evt) {
    if (evt.key === `Escape` || evt.button === 0) {
      evt.preventDefault();
      closeErrorPopup();
    }
  }

  successPopup.addEventListener(`keydown`, onPopupEscPress);
  errorPopup.addEventListener(`keydown`, onPopupErrorHandler);
  errorButton.addEventListener(`mousedown`, onPopupErrorHandler);
})();
