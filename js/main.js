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

map.classList.remove(`map--faded`);

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

// задача 3
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

getMarkers(adverts);
