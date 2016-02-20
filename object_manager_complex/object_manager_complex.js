ymaps.ready(function () {

    var map = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 11,
        controls: ['zoomControl']
    }),
    objectManager = new ymaps.ObjectManager();

    // Загружаем GeoJSON файл с описанием объектов
    fetch('data.geojson')
        .then(function (res) {
            return res.json();
        })
        .then(function (geoJson) {
            // добавляем JSON объект в менеджер объектов
            objectManager.add(geoJson);
            // добавляем объекты на карту
            map.geoObjects.add(objectManager);
        });
});
