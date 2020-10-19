'use strict';

(function () {
  const main = document.querySelector(`main`);
  const templateError = document.querySelector(`#error`).content.querySelector(`.error`);
  const templateSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const statusCode = {
    OK: 200
  };
  // console.log(templateError);
  // console.log(templateSuccess);
  // console.log(errorButton);


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
    upload(new FormData(window.main.adForm), successHandler);
    evt.preventDefault();
  });

  function successHandler() {
    let successMessage = templateSuccess.cloneNode(true);
    successMessage.classList.add(`success`);
    main.appendChild(successMessage);
    window.addEventListener(`keydown`, onPopupEscPress);
  }

  function errorHandler() {
    let errorMessage = templateError.cloneNode(true);
    errorMessage.classList.add(`error`);
    main.appendChild(errorMessage);
    window.addEventListener(`keydown`, onPopupErrorHandler);
    let errorButton = errorMessage.querySelector(`.error__button`);
    errorButton.addEventListener(`mousedown`, onPopupErrorHandler);
  }

  function closeErrorPopup() {
    let errorContainer = main.querySelector(`.error`);
    errorContainer.remove();
    window.removeEventListener(`keydown`, onPopupErrorHandler);
  }

  function closeSuccessPopup() {
    let successContainer = main.querySelector(`.success`);
    successContainer.remove();
    window.removeEventListener(`keydown`, onPopupEscPress);
  }

  function onPopupEscPress(evt) {
    if (evt.key === `Escape`) {
      closeSuccessPopup();
    }
  }

  function onPopupErrorHandler(evt) {
    if (evt.key === `Escape` || evt.button === 0) {
      evt.preventDefault();
      closeErrorPopup();
    }
  }
})();
