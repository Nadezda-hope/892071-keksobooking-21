'use strict';

(function () {
  let typeOfHouse;
  let priceOfHouse;
  let roomsOfHouse;
  let guestsOfHouse;
  let featuresOfHouse;

  const mapSelectType = document.querySelector(`#housing-type`);
  const mapSelectPrice = document.querySelector(`#housing-price`);
  const mapSelectRooms = document.querySelector(`#housing-rooms`);
  const mapSelectGuests = document.querySelector(`#housing-guests`);
  const mapFieldsetFeatures = document.querySelector(`#housing-features`);

  function updateMarkers() {
    window.main.delPrevElements();
    let filteredMarkers = [...window.main.mapMarkers];

    if (typeOfHouse !== `any`) {
      filteredMarkers = filteredMarkers.filter(function (marker) {
        return marker.offer.type === typeOfHouse;
      });
    }

    if (priceOfHouse !== `any`) {
      switch (priceOfHouse) {
        case `low`:
          filteredMarkers = filteredMarkers.filter(function (marker) {
            return marker.offer.price <= 10000;
          });
          break;
        case `middle`:
          filteredMarkers = filteredMarkers.filter(function (marker) {
            return marker.offer.price > 10000 && marker.offer.price < 50000;
          });
          break;
        case `high`:
          filteredMarkers = filteredMarkers.filter(function (marker) {
            return marker.offer.price >= 50000;
          });
          break;
      }
    }

    if (roomsOfHouse !== `any`) {
      filteredMarkers = filteredMarkers.filter(function (marker) {
        return marker.offer.rooms === roomsOfHouse;
      });
    }

    if (guestsOfHouse !== `any`) {
      filteredMarkers = filteredMarkers.filter(function (marker) {
        return marker.offer.guests === guestsOfHouse;
      });
    }

    filteredMarkers = filteredMarkers.filter(function (marker) {
      marker.offer.features.some(function (feature) {
        return feature === featuresOfHouse;
      });
    });

    window.pin.getMarkers(filteredMarkers);
  }

  mapSelectType.addEventListener(`change`, window.debounce.setDebounce(function (evt) {
    typeOfHouse = evt.target.value;
    updateMarkers();
    window.card.closeAllPopups();
  }));

  mapSelectPrice.addEventListener(`change`, window.debounce.setDebounce(function (evt) {
    priceOfHouse = evt.target.value;
    updateMarkers();
    window.card.closeAllPopups();
  }));

  mapSelectRooms.addEventListener(`change`, window.debounce.setDebounce(function (evt) {
    roomsOfHouse = +evt.target.value;
    updateMarkers();
    window.card.closeAllPopups();
  }));

  mapSelectGuests.addEventListener(`change`, window.debounce.setDebounce(function (evt) {
    guestsOfHouse = +evt.target.value;
    updateMarkers();
    window.card.closeAllPopups();
  }));

  mapFieldsetFeatures.addEventListener(`change`, window.debounce.setDebounce(function (evt) {
    featuresOfHouse = evt.target.value;
    updateMarkers();
    window.card.closeAllPopups();
  }));

  window.filter = {
    updateMarkers
  };
})();
