'use strict';

(function () {
  const adSelectRooms = window.main.adForm.querySelector(`#room_number`);
  const adSelectGuests = window.main.adForm.querySelector(`#capacity`);

  window.main.adForm.addEventListener(`change`, function () {
    let selectRoomsValue = adSelectRooms.value;
    let selectGuestsValue = adSelectGuests.value;

    if (selectRoomsValue !== selectGuestsValue) {
      adSelectGuests.setCustomValidity(`Количество гостей не соответствует количеству комнат`);
      adSelectRooms.setCustomValidity(`Количество гостей не соответствует количеству комнат`);
    } else {
      adSelectGuests.setCustomValidity(``);
      adSelectRooms.setCustomValidity(``);
    }

    adSelectGuests.reportValidity();
  });

  window.validation = {
    adSelectRooms,
    adSelectGuests
  };
})();
