'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormChildren = document.querySelector(`.ad-form`).children;
  const mapForm = document.querySelector(`.map__filters`);
  const mapFiltersFormChildren = document.querySelector(`.map__filters`).children;
  const mapPins = map.querySelector(`.map__pins`);
  const ENTER_KEYCODE = 13;
  const ESC_KEYCODE = 27;
  const BUTTON_LEFT_CODE = 0;
  let mapMarkers = [];

  const toggleDisabledInput = (elements) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].toggleAttribute(`disabled`);
    }
  };

  toggleDisabledInput(adFormChildren);
  toggleDisabledInput(mapFiltersFormChildren);

  const createErrorWarning = (message) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 10; margin: 0 auto; text-align: center; background-color: rgba(255, 86, 53, 0.7); position: absolute; top: 0; left: 0; right: 0; font-size: 18px; color: white;`;
    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const getTypePlace = (type) => {
    switch (type) {
      case `flat`:
        return `Квартира`;
      case `bungalow`:
        return `Бунгало`;
      case `house`:
        return `Дом`;
      case `palace`:
        return `Дворец`;
      default:
        return `Не указан`;
    }
  };

  const getSrcPhotos = (photos, element) => {
    const photoItem = element.querySelector(`.popup__photo`);
    const photosContainer = element.querySelector(`.popup__photos`);
    photoItem.src = photos[0];
    for (let i = 1; i < photos.length; i++) {
      const photo = photoItem.cloneNode(true);
      photo.src = photos[i];
      photosContainer.appendChild(photo);
    }
  };

  const delPrevElements = () => {
    const prevPins = document.querySelectorAll(`.map__pin`);
    for (let i = 1; i < prevPins.length; i++) {
      prevPins[i].remove();
    }
  };

  window.main = {
    map,
    mapForm,
    adForm,
    adFormChildren,
    mapFiltersFormChildren,
    mapPins,
    mapMarkers,
    ENTER_KEYCODE,
    ESC_KEYCODE,
    BUTTON_LEFT_CODE,
    toggleDisabledInput,
    getTypePlace,
    getSrcPhotos,
    createErrorWarning,
    delPrevElements
  };
})();
