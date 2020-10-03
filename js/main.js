'use strict';
// задача 1
const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const template = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const adverts = [];

const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN = [`12.00`, `13.00`, `14.00`];
const CHECKOUT = [`12.00`, `13.00`, `14.00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const WIDTH_MARKER = 50;
const HEIGHT_MARKER = 70;
const WIDTH_PIN_MAIN = 200;

const adFormFieldsets = document.querySelectorAll(`.ad-form__element`);
const adForm = document.querySelector(`.ad-form`);
const adFormHeader = document.querySelector(`.ad-form-header`);
const inputAddress = adForm.querySelector(`input[name="address"]`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const mapSelectFilters = mapFiltersForm.querySelectorAll(`.map__filter`);
const mapFeatures = mapFiltersForm.querySelector(`.map__features`);
const mapSelectRooms = mapFiltersForm.querySelector(`#housing-rooms`);
const mapSelectGuests = mapFiltersForm.querySelector(`#housing-guests`);

// генерация случайных значений
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// добавляем объект в массив

for (let i = 0; i < 8; i++) {
  let advert = {
    author: {
      avatar: `img/avatars/user0${i + 1}.png`
    },

    offer: {
      title: ``,
      address: `location.x, location.y`,
      price: 1000,
      type: TYPES[getRandomValue(1, 4)],
      rooms: 5,
      guests: 5,
      checkin: CHECKIN[getRandomValue(1, 3)],
      checkout: CHECKOUT[getRandomValue(1, 3)],
      features: FEATURES[getRandomValue(1, 6)],
      description: ``,
      photos: PHOTOS[getRandomValue(1, 3)]
    },

    location: {
      x: getRandomValue(1, 1200),
      y: getRandomValue(130, 630)
    }
  };
  adverts.push(advert);
}

// создание меток на карте
function getMarkers(markers) {
  for (let i = 0; i < markers.length; i++) {
    let markerElement = template.cloneNode(true);
    markerElement.classList.add(`map__pin`);

    markerElement.style.left = `${markers[i].location.x - (WIDTH_MARKER / 2)}px`;
    markerElement.style.top = `${markers[i].location.y - HEIGHT_MARKER}px`;
    markerElement.querySelector(`img`).src = markers[i].author.avatar;
    markerElement.querySelector(`img`).alt = markers[i].offer.title;

    mapPins.appendChild(markerElement);
  }
}

// добавление атрибута disabled
function getDisabledInput() {
  for (let i = 0; i < mapSelectFilters.length; i++) {
    mapSelectFilters[i].setAttribute(`disabled`, true);
  }
  for (let i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].setAttribute(`disabled`, true);
  }
  mapFeatures.setAttribute(`disabled`, true);
  adFormHeader.setAttribute(`disabled`, true);
}

getDisabledInput();

function getEnableInput() {
  for (let i = 0; i < mapSelectFilters.length; i++) {
    mapSelectFilters[i].removeAttribute(`disabled`, false);
  }
  for (let i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].removeAttribute(`disabled`, false);
  }
  mapFeatures.removeAttribute(`disabled`, false);
  adFormHeader.removeAttribute(`disabled`, false);
}

function onPinsClick(evt) {
  if (evt.button === 0) {
    showPage();
  }
}

function showPage() {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  getMarkers(adverts);
  getEnableInput();

  document.addEventListener(`mousedown`, onPinsClick);
}

function showAddress() {
  for (let i = 0; i < adverts.length; i++) {
    if (inputAddress.disabled) {
      inputAddress.value = `${adverts[i].location.x + HEIGHT_MARKER}, ${adverts[i].location.y + WIDTH_MARKER}`;
    } else {
      inputAddress.value = `${adverts[i].location.x + WIDTH_PIN_MAIN / 2}, ${adverts[i].location.y + WIDTH_PIN_MAIN / 2}`;
    }
  }
}

showAddress();

mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    showPage();
    showAddress();
  }
});

mapPinMain.removeEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    showPage();
    showAddress();
  }
});

// валидация формы

mapFiltersForm.addEventListener(`change`, function () {
  let selectRoomsValue = mapSelectRooms.value;
  let selectGuestsValue = mapSelectGuests.value;

  if (selectRoomsValue !== selectGuestsValue) {
    mapSelectGuests.setCustomValidity(`Количество гостей не соответствует количеству комнат`);
    mapSelectRooms.setCustomValidity(`Количество гостей не соответствует количеству комнат`);
  } else {
    mapSelectGuests.setCustomValidity(``);
  }

  mapSelectGuests.reportValidity();
});
