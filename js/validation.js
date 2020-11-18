'use strict';

(() => {
  const MIN_PRICE_BUNGALOW = 0;
  const MAX_PRICE_BUNGALOW = 999;
  const MIN_PRICE_FLAT = 1000;
  const MAX_PRICE_FLAT = 4999;
  const MIN_PRICE_HOUSE = 5000;
  const MAX_PRICE_HOUSE = 9999;
  const MIN_PRICE_PALACE = 10000;
  const MAX_PRICE_PALACE = 1000000;
  const adSelectRooms = window.main.adForm.querySelector(`#room_number`);
  const adSelectGuests = window.main.adForm.querySelector(`#capacity`);
  const adSelectTimein = window.main.adForm.querySelector(`#timein`);
  const adSelectTimeout = window.main.adForm.querySelector(`#timeout`);
  const adSelectType = window.main.adForm.querySelector(`#type`);
  const adInputPrice = window.main.adForm.querySelector(`#price`);
  const adInputTitle = document.querySelector(`#title`);

  const checkValidity = () => {
    const selectRoomsValue = adSelectRooms.value;
    const selectGuestsValue = adSelectGuests.value;

    const isValidTwoRooms = selectRoomsValue === `2` && selectGuestsValue === `1`;
    const isValidThreeRooms = selectRoomsValue === `3` && (selectGuestsValue === `2` || selectGuestsValue === `1`);
    const isValidHundredRooms = selectRoomsValue === `100` && selectGuestsValue === `0`;

    const isValid = selectRoomsValue === selectGuestsValue || isValidTwoRooms || isValidThreeRooms || isValidHundredRooms;

    return isValid;
  };

  const capacityChangeHandler = () => {
    if (checkValidity()) {
      adSelectGuests.setCustomValidity(``);
    } else {
      adSelectGuests.setCustomValidity(`Количество гостей не соответствует количеству комнат`);
    }
    adSelectGuests.reportValidity();
  };

  capacityChangeHandler();

  const checkInChangeHandler = () => {
    adSelectTimeout.value = adSelectTimein.value;
  };

  const checkOutChangeHandler = () => {
    adSelectTimein.value = adSelectTimeout.value;
  };

  const typeOfPlaceChangeHandler = () => {
    switch (adSelectType.value) {
      case `bungalow`:
        adInputPrice.placeholder = MIN_PRICE_BUNGALOW;
        adInputPrice.min = MIN_PRICE_BUNGALOW;
        adInputPrice.max = MAX_PRICE_BUNGALOW;
        break;
      case `flat`:
        adInputPrice.placeholder = MIN_PRICE_FLAT;
        adInputPrice.min = MIN_PRICE_FLAT;
        adInputPrice.max = MAX_PRICE_FLAT;
        break;
      case `house`:
        adInputPrice.placeholder = MIN_PRICE_HOUSE;
        adInputPrice.min = MIN_PRICE_HOUSE;
        adInputPrice.max = MAX_PRICE_HOUSE;
        break;
      case `palace`:
        adInputPrice.placeholder = MIN_PRICE_PALACE;
        adInputPrice.min = MIN_PRICE_PALACE;
        adInputPrice.max = MAX_PRICE_PALACE;
        break;
      default: adInputPrice.placeholder = MIN_PRICE_HOUSE;
        adInputPrice.min = MIN_PRICE_HOUSE;
    }
  };

  typeOfPlaceChangeHandler();

  adSelectRooms.addEventListener(`change`, capacityChangeHandler);
  adSelectGuests.addEventListener(`change`, capacityChangeHandler);
  adSelectTimein.addEventListener(`change`, checkInChangeHandler);
  adSelectTimeout.addEventListener(`change`, checkOutChangeHandler);
  adSelectType.addEventListener(`change`, typeOfPlaceChangeHandler);

  window.main.adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    if (adInputTitle.validity.valueMissing) {
      adInputTitle.style = `border: 2px solid rgba(255, 0, 0, 0.5);`;
    }
    if (adInputPrice.validity.valid) {
      adInputPrice.style = `border: 2px solid rgba(255, 0, 0, 0.5);`;
    }
    if (!checkValidity()) {
      adSelectGuests.style = `border: 2px solid rgba(255, 0, 0, 0.5);`;
    }
  });
})();
