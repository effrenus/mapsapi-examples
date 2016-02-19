(function () {

	var LAYER_NAME = 'user#layer',
		MAP_TYPE_NAME = 'user#customMap',
		// Директория с тайлами
		TILES_PATH = './images/tiles',
		map;

	function onMapReady () {
		setupMapLayer();
		setupMap();
	}

	function setupMapLayer () {
		// Конструктор, создающий собственный слой
		var Layer = function () {
		    var layer = new ymaps.Layer(TILES_PATH + '/%z/%x-%y.jpeg', {
		    	// Опция, указывающая по какому url нужно загрузить картинку, если картинка для тайла не загрузилась
		        notFoundTile: TILES_PATH + '/2/0-0.jpeg'
		    });
		    // Указываем доступный диапазон масштабов для данного слоя
		    layer.getZoomRange = function () {
		        return ymaps.vow.resolve([1, 3]);
		    };
		    layer.getCopyrights = function () {
		        return ymaps.vow.resolve('Копирайты');
		    };
		    return layer;
		};
		// Добавляем в хранилище слоев собственный конструктор
		ymaps.layer.storage.add(LAYER_NAME, Layer);

		// Создадим новый тип карты и укажем ключ нашего конструктора слоя
		var mapType = new ymaps.MapType(MAP_TYPE_NAME, [LAYER_NAME]);
		// Сохраняем тип в хранилище типов
		ymaps.mapType.storage.add(MAP_TYPE_NAME, mapType);
	}

	function setupMap () {
		// Создаем карту, указав свой новый тип карты
		map = new ymaps.Map('map', {
		    center: [0, 0],
		    zoom: 1,
		    controls: ['zoomControl'],
		    type: MAP_TYPE_NAME
		}, {
		    projection: new ymaps.projection.Cartesian([[-1, -1], [1, 1]], [false, false])
		});
	}

	ymaps.ready(onMapReady);
})();