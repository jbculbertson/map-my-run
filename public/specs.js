webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Load all specs so webpack can find them. Think of this as an automatic
	// manifest for bundling specs.

	var req = __webpack_require__(167);
	req.keys().forEach(req);

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

	'use strict';

	module.exports = true;

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./example.spec.js": 168
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 167;


/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var example = __webpack_require__(156);

	describe('Example', function () {
	  it('is true', function () {
	    expect(example).toBe(true);
	  });
	});

/***/ })

});