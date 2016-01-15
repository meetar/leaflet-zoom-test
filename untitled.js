mouse = new L.Point(0, 0)
for (var x = 0; x < 250; x++ ) {
	setTimeout( function() {
		zoom = map.getZoom();
		delta = .0005;
		map.setZoomAround(mouse, zoom + delta);
	}, 10 * x);
}