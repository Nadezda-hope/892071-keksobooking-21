'use strict';

(function () {
  const adSelectRooms = window.main.adForm.querySelector(`#room_number`);
  const adSelectGuests = window.main.adForm.querySelector(`#capacity`);
  const adSelectTimein = window.main.adForm.querySelector(`#timein`);
  const adSelectTimeout = window.main.adForm.querySelector(`#timeout`);
  const adSelectType = window.main.adForm.querySelector(`#type`);
  const adInputPrice = window.main.adForm.querySelector(`#price`);

  function changeCapacity() {
    let selectRoomsValue = adSelectRooms.value;
    let selectGuestsValue = adSelectGuests.value;

    if (selectRoomsValue !== `100` && selectGuestsValue !== `0` && selectRoomsValue !== selectGuestsValue) {
      adSelectGuests.setCustomValidity(`Количество гостей не соответствует количеству комнат`);
      adSelectRooms.setCustomValidity(`Количество гостей не соответствует количеству комнат`);
    } else {
      adSelectGuests.setCustomValidity(``);
      adSelectRooms.setCustomValidity(``);
    }

    adSelectGuests.reportValidity();
  }

  function changeCheckIn() {
    adSelectTimeout.value = adSelectTimein.value;
  }

  function changeTypeOfPlace() {
    switch (adSelectType.value) {
      case `bungalow`:
        adInputPrice.placeholder = 0;
        adInputPrice.min = 0;
        break;
      case `flat`:
        adInputPrice.placeholder = 1000;
        adInputPrice.min = 1000;
        break;
      case `house`:
        adInputPrice.placeholder = 5000;
        adInputPrice.min = 5000;
        break;
      case `palace`:
        adInputPrice.placeholder = 10000;
        adInputPrice.min = 10000;
        break;
      default: adInputPrice.placeholder = 5000;
        adInputPrice.min = 5000;
    }
  }

  adSelectRooms.addEventListener(`change`, changeCapacity);
  adSelectGuests.addEventListener(`change`, changeCapacity);
  adSelectTimein.addEventListener(`change`, changeCheckIn);
  adSelectTimeout.addEventListener(`change`, changeCheckIn);
  adSelectType.addEventListener(`change`, changeTypeOfPlace);

  window.validation = {
    adSelectRooms,
    adSelectGuests
  };
})();
