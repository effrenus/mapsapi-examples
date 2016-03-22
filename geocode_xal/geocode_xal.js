ymaps.ready(function () {
    var map = new ymaps.Map('map', {
        center: [58.527840, 31.268922],
        zoom: 14,
        controls: []
    }, {
        balloonCloseButton: false,
        balloonAutoPan: false,
        balloonPanelMaxMapArea: 0
    });

    map.events
        .add('click', function (event) {
            // Получаем координаты клика, ищем по ним ближайшую улицу, показываем балун с описанием.
            process(event.get('coords'));
        })
        .add('actionend', function () {
            // После каждого движения карты показываем данные объекта, ближайшего к центру карты.
            process(map.getCenter());
        });

    process(map.getCenter());

    function process (coordinates) {
        return geocode(coordinates).then(display);
    }

    function geocode (coordinates) {
        // Производим обратное геокодирование.
        // По координатам получаем адрес.
        return ymaps.geocode(coordinates, {
                provider: 'yandex#map',
                results: 1,
                kind: 'street'
            });
    }

    function display (result) {
        // В функцию передаются результаты геокодирования.
        // Свойство geoObjects содержит коллекцию объектов GeocodeResult.
        if (result.geoObjects.getLength() == 0) {
            return;
        }
        var geoResult = result.geoObjects.get(0);
        console.log('Страна: ', geoResult.getCountry());
        console.log('Адрес: ', geoResult.getAddressLine());
        console.log('Населенный пункт: ', geoResult.getLocalities());

        // Открываем балун. В качестве данных передаем адрес объекта.
        map.balloon.open(geoResult.geometry.getCoordinates(), geoResult.getAddressLine());
    }

});
