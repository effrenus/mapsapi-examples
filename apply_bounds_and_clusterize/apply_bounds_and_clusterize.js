function init () {
    var myMap = new ymaps.Map("map", {
            center: [55.73, 37.75],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });

    // Сделаем запрос на геокодирование, а затем спозиционируем карту, чтобы
    // все объекты попадали в видимую область карты и коэффициент масштабирования был
    // максимально возможным.
    var result = ymaps.geoQuery(ymaps.geocode('Арбат')).applyBoundsToMap(myMap, {checkZoomRange: true});
    // Откластеризуем полученные объекты и добавим кластеризатор на карту.
    // Обратите внимание, что кластеризатор будет создан сразу, а объекты добавлены в него
    // только после того, как будет получен ответ от сервера.
    myMap.geoObjects.add(result.clusterize());
}
ymaps.ready(init);