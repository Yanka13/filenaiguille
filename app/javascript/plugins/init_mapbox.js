import mapboxgl from 'mapbox-gl';
const mapElement = document.getElementById('map');

const buildMap = (center) => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  if (center) {
    return new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/yanka13/ckanz4tlh4z9a1il6hglrrkw4',
      center: [center.lng, center.lat],
      zoom : 12
    });
  } else {
      return new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/yanka13/ckanz4tlh4z9a1il6hglrrkw4',
    });
    }
};

const addMarkersToMap = (map, markers, center) => {
  markers.forEach((marker) => {
    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);

       // Create a HTML element for your custom marker
    const element = document.createElement('div');
    element.className = 'marker';
    element.style.backgroundImage = `url('${marker.image_url}')`;
    element.style.backgroundSize = 'contain';
    element.style.width = '25px';
    element.style.height = '25px';

    // Pass the element as an argument to the new marker
    new mapboxgl.Marker(element)
      .setLngLat([marker.lng, marker.lat])
      .setPopup(popup)
      .addTo(map);
  });

  const pin = document.createElement('div');
  pin.className = 'marker';
  pin.style.backgroundImage = `url('${center.image_url}')`;
  pin.style.backgroundSize = 'contain';
  pin.style.width = '25px';
  pin.style.height = '25px';

  new mapboxgl.Marker(pin)
    .setLngLat([center.lng, center.lat])
    .addTo(map);
};


const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  //map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0});
};

const initMapbox = () => {
  if (mapElement) {
    const center = JSON.parse(mapElement.dataset.center);
    if (center) {
      const map = buildMap(center);
      const markers = JSON.parse(mapElement.dataset.markers);
      addMarkersToMap(map, markers, center);
      fitMapToMarkers(map, markers);
    }

  }
};

export { initMapbox };
