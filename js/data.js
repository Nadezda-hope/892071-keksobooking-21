'use strict';

(function () {
  const adverts = [];

  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const CHECKIN = [`12.00`, `13.00`, `14.00`];
  const CHECKOUT = [`12.00`, `13.00`, `14.00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  for (let i = 0; i < 8; i++) {
    let advert = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },

      offer: {
        title: ``,
        address: `location.x, location.y`,
        price: 1000,
        type: TYPES[window.main.getRandomValue(1, 4)],
        rooms: 5,
        guests: 5,
        checkin: CHECKIN[window.main.getRandomValue(1, 3)],
        checkout: CHECKOUT[window.main.getRandomValue(1, 3)],
        features: FEATURES[window.main.getRandomValue(1, 6)],
        description: ``,
        photos: PHOTOS[window.main.getRandomValue(1, 3)]
      },

      location: {
        x: window.main.getRandomValue(1, 1200),
        y: window.main.getRandomValue(130, 630)
      }
    };
    adverts.push(advert);
  }

  window.data = {
    adverts,
    TYPES,
    CHECKIN,
    CHECKOUT,
    FEATURES,
    PHOTOS
  };
})();

