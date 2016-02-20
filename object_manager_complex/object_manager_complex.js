ymaps.ready(function () {

    var map = new ymaps.Map('map', {
        center: [37.64, 55.76],
        zoom: 10,
        controls: []
    }),
    objectManager = new ymaps.ObjectManager();

    fetch('data.json')
        .then(function (res) {
            return res.json();
        })
        .then(function (geoJson) {
            objectManager.add(geoJson);
            map.geoObjects.add(objectManager);
        });
});
