let map;
let service;
let infowindow;

document.getElementById("findBtn").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap, errorHandler);
  } else {
    alert("Geolocation not supported.");
  }
});

function initMap(position) {
  const userLocation = new google.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude
  );

  map = new google.maps.Map(document.getElementById("map"), {
    center: userLocation,
    zoom: 14,
  });

  const request = {
    location: userLocation,
    radius: "5000", // 5km
    keyword: "thrift store"
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  const list = document.getElementById("storeList");
  list.innerHTML = "";

  if (status === google.maps.places.PlacesServiceStatus.OK) {
    results.forEach((place) => {
      // add marker
      new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name
      });

      // add to list
      const li = document.createElement("li");
      li.textContent = place.name + " - " + (place.vicinity || "");
      list.appendChild(li);
    });
  }
}

function errorHandler(error) {
  alert("Error getting location: " + error.message);
}
