/*jslint browser: true*/
/*global Tangram, gui */

map = (function () {
    'use strict';

    var map_start_location = [40.70531887544228, -74.00976419448853, 15]; // NYC

    /*** URL parsing ***/

    // leaflet-style URL hash pattern:
    // #[zoom],[lat],[lng]
    var url_hash = window.location.hash.slice(1, window.location.hash.length).split('/');

    if (url_hash.length == 3) {
        map_start_location = [url_hash[1],url_hash[2], url_hash[0]];
        // convert from strings
        map_start_location = map_start_location.map(Number);
    }

    /*** Map ***/

    L.CRS.CustomZoom = L.extend({}, L.CRS.Simple, {
        scale: function (zoom) {
            // This method should return the tile grid size
            // (which is always square) for a specific zoom
            // We want 0 = 200px = 2 tiles @ 100x100px,
            // 1 = 300px = 3 tiles @ 100x100px, etc.
            // Ie.: (200 + zoom*100)/100 => 2 + zoom

            return 2 + zoom;
        }
    });

    var map = L.map('map', {
        // crs: L.CRS.CustomZoom,
        scrollWheelZoom : true,
        keyboardZoomOffset : .05,
        zoomControl: false
    });

    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        // 'https://stamen-tiles.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.jpg',
        {
            maxZoom: 19//,
            // opacity: 0.5
        })
    .addTo(map);

    map.addControl(L.control.fractionalZoom({position: 'topright', zoomIncrement:.2}));

    // setView expects format ([lat, long], zoom)
    map.setView(map_start_location.slice(0, 3), map_start_location[2]);

    /***** Render loop *****/

    // window.addEventListener('load', function () {
    //     // Scene initialized
    //     layer.on('init', function() {
    //     });
    //     layer.addTo(map);
    // });

    return map;

}());
