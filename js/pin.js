'use strict';

(function () {
  const mapPins = window.main.map.querySelector(`.map__pins`);
  const template = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const WIDTH_MARKER = 65;
  const HEIGHT_MARKER = 87;

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

  window.pin = {
    getMarkers,
    WIDTH_MARKER,
    HEIGHT_MARKER
  };
})();
