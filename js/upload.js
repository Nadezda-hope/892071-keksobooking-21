'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const main = document.querySelector(`main`);
  const templateError = document.querySelector(`#error`).content.querySelector(`.error`);
  const templateSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
  const buttonReset = document.querySelector(`.ad-form__reset`);
  const statusCode = {
    OK: 200
  };

  const upload = (data, onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status !== statusCode.OK) {
        errorHandler();
        return;
      }
      onSuccess(xhr.response);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.main.adForm.addEventListener(`submit`, (evt) => {
    upload(new FormData(window.main.adForm), successHandler);
    evt.preventDefault();
  });

  const successHandler = () => {
    const successMessage = templateSuccess.cloneNode(true);
    successMessage.classList.add(`success`);
    main.appendChild(successMessage);
    window.addEventListener(`keydown`, onPopupSuccessEscPress);
    successMessage.addEventListener(`click`, onPopupSuccessClick);
    getDisabledPage();
  };

  const errorHandler = () => {
    const errorMessage = templateError.cloneNode(true);
    const errorButton = errorMessage.querySelector(`.error__button`);
    errorMessage.classList.add(`error`);
    main.appendChild(errorMessage);
    window.addEventListener(`keydown`, onPopupErrorKeydown);
    errorMessage.addEventListener(`click`, onPopupErrorClick);
    errorButton.addEventListener(`click`, onPopupErrorClick);
  };

  const closeErrorPopup = () => {
    const errorMessage = main.querySelector(`.error`);
    const errorButton = errorMessage.querySelector(`.error__button`);
    errorMessage.remove();
    window.removeEventListener(`keydown`, onPopupErrorKeydown);
    errorMessage.removeEventListener(`click`, onPopupErrorClick);
    errorButton.removeEventListener(`click`, onPopupErrorClick);
  };

  const closeSuccessPopup = () => {
    const successMessage = main.querySelector(`.success`);
    successMessage.remove();
    window.removeEventListener(`keydown`, onPopupSuccessEscPress);
    successMessage.removeEventListener(`click`, onPopupSuccessClick);
  };

  const onPopupSuccessEscPress = (evt) => {
    if (evt.keyCode === window.main.ESC_KEYCODE) {
      closeSuccessPopup();
    }
  };

  const onPopupSuccessClick = () => {
    closeSuccessPopup();
  };

  const onPopupErrorKeydown = (evt) => {
    if (evt.keyCode === window.main.ESC_KEYCODE) {
      evt.preventDefault();
      closeErrorPopup();
    }
  };

  const onPopupErrorClick = (evt) => {
    evt.preventDefault();
    closeErrorPopup();
  };

  const getDisabledPage = () => {
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
  };

  buttonReset.addEventListener(`click`, () => {
    getDisabledPage();
  });
})();
