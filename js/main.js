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

const WIDTH_MARKER = 65;
const HEIGHT_MARKER = 87;

const adForm = document.querySelector(`.ad-form`);
const adFormChildren = document.querySelector(`.ad-form`).children;
const adSelectRooms = adForm.querySelector(`#room_number`);
const adSelectGuests = adForm.querySelector(`#capacity`);
const inputAddress = adForm.querySelector(`input[name="address"]`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const mapFiltersFormChildren = document.querySelector(`.map__filters`).children;
const coordPinTop = mapPinMain.offsetTop;
const coordPinLeft = mapPinMain.offsetLeft;

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
function toggleDisabledInput(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].toggleAttribute(`disabled`);
  }
}

toggleDisabledInput(adFormChildren);
toggleDisabledInput(mapFiltersFormChildren);


inputAddress.value = `${coordPinTop + WIDTH_MARKER / 2}, ${coordPinLeft + WIDTH_MARKER / 2}`;

function showPage() {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  getMarkers(adverts);
  toggleDisabledInput(adFormChildren);
  toggleDisabledInput(mapFiltersFormChildren);
  mapPinMain.removeEventListener(`mousedown`, onPinsClick);
  mapPinMain.removeEventListener(`keydown`, onPinsEnterPress);
}

function onPinsClick(evt) {
  if (evt.button === 0) {
    showPage();
    inputAddress.value = `${coordPinTop + HEIGHT_MARKER}, ${coordPinLeft + WIDTH_MARKER / 2}`;
  }
}

function onPinsEnterPress(evt) {
  if (evt.key === `Enter`) {
    showPage();
    inputAddress.value = `${coordPinTop + HEIGHT_MARKER}, ${coordPinLeft + WIDTH_MARKER / 2}`;
  }
}

mapPinMain.addEventListener(`mousedown`, onPinsClick);
mapPinMain.addEventListener(`keydown`, onPinsEnterPress);


// валидация формы

adForm.addEventListener(`change`, function () {
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
