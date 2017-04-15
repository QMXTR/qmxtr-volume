if(typeof require !== 'undefined') {
	if(typeof __webpack_modules__ !== 'undefined'){
		require('./dist/qmxtr-volume.bundle.css');
	}

	const VolumePlugin = require('./dist/qmxtr-volume.bundle.js');

	if(typeof module !== 'undefined' && module.exports) {
		module.exports = VolumePlugin;
	} else {
		window.VolumePlugin = VolumePlugin;
	}
} else {
	console.error('Require doesn\'t exists!');
}
