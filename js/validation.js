'use strict';

(function () {
  const adSelectRooms = window.main.adForm.querySelector(`#room_number`);
  const adSelectGuests = window.main.adForm.querySelector(`#capacity`);
  const adSelectTimein = window.main.adForm.querySelector(`#timein`);
  const adSelectTimeout = window.main.adForm.querySelector(`#timeout`);
  const adSelectType = window.main.adForm.querySelector(`#type`);
  const adInputPrice = window.main.adForm.querySelector(`#price`);

  function changeCapacity() {
    const selectRoomsValue = adSelectRooms.value;
    const selectGuestsValue = adSelectGuests.value;

    if (selectRoomsValue !== selectGuestsValue) {
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
    if (adSelectType.value === `bungalow`) {
      adInputPrice.placeholder = 0;
      adInputPrice.min = 0;
    } else if (adSelectType.value === `flat`) {
      adInputPrice.placeholder = 1000;
      adInputPrice.min = 1000;
    } else if (adSelectType.value === `house`) {
      adInputPrice.placeholder = 5000;
      adInputPrice.min = 5000;
    } else if (adSelectType.value === `palace`) {
      adInputPrice.placeholder = 10000;
      adInputPrice.min = 10000;
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
