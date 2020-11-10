'use strict';

(function () {
  let typeOfHouse = `any`;
  let priceOfHouse = `any`;
  let roomsOfHouse = `any`;
  let guestsOfHouse = `any`;
  const features = {wifi: false, dishwasher: false, parking: false, washer: false, elevator: false, conditioner: false};

  const mapSelectType = document.querySelector(`#housing-type`);
  const mapSelectPrice = document.querySelector(`#housing-price`);
  const mapSelectRooms = document.querySelector(`#housing-rooms`);
  const mapSelectGuests = document.querySelector(`#housing-guests`);
  const mapFieldsetFeatures = document.querySelector(`#housing-features`);

  function updateMarkers() {
    let filteredMarkers = [...window.main.mapMarkers];
    const selectedFeauters = Object.keys(features).filter(function (feature) {
      return features[feature];
    });

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
      return selectedFeauters.every(function (feature) {
        return marker.offer.features.includes(feature);
      });
    });

    return filteredMarkers;
  }

  function renderFilteredMarkers() {
    window.main.delPrevElements();
    let filteredMarkers = updateMarkers();
    window.pin.getMarkers(filteredMarkers);
    window.card.closeAllPopups();
  }

  mapSelectType.addEventListener(`change`, window.debounce.setDebounce(function (evt) {
    typeOfHouse = evt.target.value;
    renderFilteredMarkers();
  }));

  mapSelectPrice.addEventListener(`change`, window.debounce.setDebounce(function (evt) {
    priceOfHouse = evt.target.value;
    renderFilteredMarkers();
  }));

  mapSelectRooms.addEventListener(`change`, window.debounce.setDebounce(function (evt) {
    roomsOfHouse = evt.target.value === `any` ? evt.target.value : Number(evt.target.value);
    renderFilteredMarkers();
  }));

  mapSelectGuests.addEventListener(`change`, window.debounce.setDebounce(function (evt) {
    guestsOfHouse = evt.target.value === `any` ? evt.target.value : Number(evt.target.value);
    renderFilteredMarkers();
  }));

  mapFieldsetFeatures.querySelector(`input[value="wifi"]`).addEventListener(`change`, function (evt) {
    features.wifi = evt.target.checked;
    renderFilteredMarkers();
  });

  mapFieldsetFeatures.querySelector(`input[value="dishwasher"]`).addEventListener(`change`, function (evt) {
    features.dishwasher = evt.target.checked;
    renderFilteredMarkers();
  });

  mapFieldsetFeatures.querySelector(`input[value="parking"]`).addEventListener(`change`, function (evt) {
    features.parking = evt.target.checked;
    renderFilteredMarkers();
  });

  mapFieldsetFeatures.querySelector(`input[value="washer"]`).addEventListener(`change`, function (evt) {
    features.washer = evt.target.checked;
    renderFilteredMarkers();
  });

  mapFieldsetFeatures.querySelector(`input[value="elevator"]`).addEventListener(`change`, function (evt) {
    features.elevator = evt.target.checked;
    renderFilteredMarkers();
  });

  mapFieldsetFeatures.querySelector(`input[value="conditioner"]`).addEventListener(`change`, function (evt) {
    features.conditioner = evt.target.checked;
    renderFilteredMarkers();
  });

  window.filter = {
    updateMarkers
  };
})();
