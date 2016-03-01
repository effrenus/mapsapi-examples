ymaps.ready(function () {
    var balloonPosition = [55.83866, 37.712326],
        Layout = ymaps.templateLayoutFactory.createClass([
            'Центровать<br>',
            '<button class="no-margin">без отступов</button>',
            '<button class="with-margin">учитывая отступы</button>',
        ].join(''), {
            build: function () {
                Layout.superclass.build.call(this, arguments);
                var container = this.getElement();
                container.getElementsByClassName('no-margin')[0].addEventListener('click', function () {
                    map.panTo(balloonPosition);
                });
                container.getElementsByClassName('with-margin')[0].addEventListener('click', function () {
                    map.panTo(balloonPosition, {useMapMargin: true});
                });
            }
        }),
        map = new ymaps.Map(
        'map',
        {
            center: [55.85, 37.7124],
            zoom: 11,
            controls: []
        },
        {
            balloonContentLayout: Layout,
            balloonAutoPan: false,
            balloonPanelMaxMapArea: 0
        }
    );

    // указываем для элементов область занимаемую над картой (положение и размер)
    // поддерживаюися значения в пикселях (px) и процентах (%)
    // если единица измерения не указана, то считается значение в пикселях
    var mapAreas = [
        // панель с иконками
        {
            top: 0,
            left: 0,
            width: '80px',
            height: '100%' // проценты расчитываются относительно размеров контейнера с картой
        },
        // блок в правом углу
        {
            top: 10,
            right: 10,
            width: '40%',
            height: '40%'
        }
    ];
    // добавляем каждый блок в менеджер отступов
    mapAreas.forEach(function (area) {
        // метод `addArea` возвращает объект, который предоставляет доступ к прямоугольной области в менеджере отступов
        var accessor = map.margin.addArea(area);
        // если вызвать метод `remove` у аксессора, то область будет удалена и менеджера отступов
        // пример: accessor.remove()

        addArea(accessor);
    });

    map.balloon.open(balloonPosition);

    var toggleAreaBtn = new ymaps.control.Button({
        data: {content: 'Показать занятые области', title: 'Показать все занятые области из менеджера отступов'},
        options: {maxWidth: 300}
    });
    // по клику над картой отображаются все области, добавленные
    // в менеджер отступов
    toggleAreaBtn.events.add(['select', 'deselect'], function (event) {
        var container = document.getElementsByClassName('area-holder')[0];
        container && container.classList[event.originalEvent.type == 'select' ? 'remove' : 'add']('is-hidden');
    });
    map.controls.add(toggleAreaBtn);

    var toggleMarginBtn = new ymaps.control.Button({
        data: {content: 'Показать поля', title: 'Показать поля карты'},
        options: {
            // разрешаем контролу автоматически добавить свои размеры в менеджер отступов
            // adjustMapMargin: true,
            maxWidth: 200
        }
    });
    toggleMarginBtn.events.add(['select', 'deselect'], function (event) {
        var container = document.getElementsByClassName('map-bounds')[0];
        container && container.classList[event.originalEvent.type == 'select' ? 'remove' : 'add']('is-hidden');
    });
    map.controls.add(toggleMarginBtn);

    // показываем поля карты
    function updateMapMargins () {
        var margin = map.margin.getMargin();
        document.getElementsByClassName('map-bounds')[0].style.borderWidth = margin.join('px ') + 'px';
    }
    updateMapMargins();
    map.events.add('marginchange', updateMapMargins);
});
