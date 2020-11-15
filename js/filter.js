'use strict';

(function () {
  let typeOfHouse = `any`;
  let priceOfHouse = `any`;
  let roomsOfHouse = `any`;
  let guestsOfHouse = `any`;
  const features = {
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false
  };

  const mapSelectType = document.querySelector(`#housing-type`);
  const mapSelectPrice = document.querySelector(`#housing-price`);
  const mapSelectRooms = document.querySelector(`#housing-rooms`);
  const mapSelectGuests = document.querySelector(`#housing-guests`);
  const mapFieldsetFeatures = document.querySelector(`#housing-features`);

  const updateMarkers = () => {
    let filteredMarkers = [...window.main.mapMarkers];
    const selectedFeauters = Object.keys(features).filter((feature) => {
      return features[feature];
    });

    if (typeOfHouse !== `any`) {
      filteredMarkers = filteredMarkers.filter((marker) => {
        return marker.offer.type === typeOfHouse;
      });
    }

    if (priceOfHouse !== `any`) {
      switch (priceOfHouse) {
        case `low`:
          filteredMarkers = filteredMarkers.filter((marker) => {
            return marker.offer.price <= 10000;
          });
          break;
        case `middle`:
          filteredMarkers = filteredMarkers.filter((marker) => {
            return marker.offer.price > 10000 && marker.offer.price < 50000;
          });
          break;
        case `high`:
          filteredMarkers = filteredMarkers.filter((marker) => {
            return marker.offer.price >= 50000;
          });
          break;
      }
    }

    if (roomsOfHouse !== `any`) {
      filteredMarkers = filteredMarkers.filter((marker) => {
        return marker.offer.rooms === roomsOfHouse;
      });
    }

    if (guestsOfHouse !== `any`) {
      filteredMarkers = filteredMarkers.filter((marker) => {
        return marker.offer.guests === guestsOfHouse;
      });
    }

    filteredMarkers = filteredMarkers.filter((marker) => {
      return selectedFeauters.every((feature) => {
        return marker.offer.features.includes(feature);
      });
    });

    return filteredMarkers;
  };

  const renderFilteredMarkers = () => {
    let filteredMarkers = updateMarkers();
    window.main.delPrevElements();
    window.pin.getMarkers(filteredMarkers);
    window.card.closeAllPopups();
  };

  mapSelectType.addEventListener(`change`, window.debounce.setDebounce((evt) => {
    typeOfHouse = evt.target.value;
    renderFilteredMarkers();
  }));

  mapSelectPrice.addEventListener(`change`, window.debounce.setDebounce((evt) => {
    priceOfHouse = evt.target.value;
    renderFilteredMarkers();
  }));

  mapSelectRooms.addEventListener(`change`, window.debounce.setDebounce((evt) => {
    roomsOfHouse = evt.target.value === `any` ? evt.target.value : Number(evt.target.value);
    renderFilteredMarkers();
  }));

  mapSelectGuests.addEventListener(`change`, window.debounce.setDebounce((evt) => {
    guestsOfHouse = evt.target.value === `any` ? evt.target.value : Number(evt.target.value);
    renderFilteredMarkers();
  }));

  mapFieldsetFeatures.addEventListener(`change`, window.debounce.setDebounce((evt) => {
    Object.keys(features).forEach((feature) => {
      if (feature === evt.target.value) {
        features[feature] = evt.target.checked;
      }
    });
    renderFilteredMarkers();
  }));

  window.filter = {
    updateMarkers
  };
})();
