(function () {
    window._managerSniffArea = function _managerSniffArea () {
        var originalAddArea = ymaps.map.margin.Manager.prototype.addArea;

        var parentElement = document.createElement('div');
        parentElement.className = 'area-holder is-hidden';
        document.body.appendChild(parentElement);

        ymaps.map.margin.Manager.prototype.addArea = function (area) {
            var accessor = originalAddArea.call(this, area);

            var markElement = document.createElement('div');
            markElement.className = 'rect';

            if (area) {
                console.log(area);
                applyArea(area);
            }

            parentElement.appendChild(markElement);

            var eventsGroup = accessor.events.group();

            eventsGroup.add('change', function () {
                applyArea(accessor.getArea());
            });

            accessor.events.once('remove', function () {
                eventsGroup.removeAll();
                parentElement.removeChild(markElement);
                markElement = null;
            });

            function applyArea (area) {
                markElement.style.cssText = '';
                for (var key in area) {
                    if (area.hasOwnProperty(key)) {
                        var value = String(area[key]);
                        if (!isNaN(Number(value[value.length - 1]))) {
                            value += 'px';
                        }
                        markElement.style[key] = value;
                    }
                }
            }

            return accessor;
        }
    }
})();