'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormChildren = document.querySelector(`.ad-form`).children;
  const mapFiltersFormChildren = document.querySelector(`.map__filters`).children;

  function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function toggleDisabledInput(elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].toggleAttribute(`disabled`);
    }
  }

  toggleDisabledInput(adFormChildren);
  toggleDisabledInput(mapFiltersFormChildren);

  window.main = {
    map,
    adForm,
    adFormChildren,
    mapFiltersFormChildren,
    getRandomValue,
    toggleDisabledInput
  };
})();
