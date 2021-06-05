/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@farvell/jflow-core/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@farvell/jflow-core/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Import library with common.js
const Handler = __webpack_require__( /*! ./src/handler */ "./node_modules/@farvell/jflow-core/src/handler.js" ),
	Parallax = __webpack_require__( /*! ./src/parallax */ "./node_modules/@farvell/jflow-core/src/parallax.js" ),
	Style = __webpack_require__( /*! ./src/style */ "./node_modules/@farvell/jflow-core/src/style.js" );

module.exports = {
	Handler,
	Style,
	Parallax
};


/***/ }),

/***/ "./node_modules/@farvell/jflow-core/src/handler.js":
/*!*********************************************************!*\
  !*** ./node_modules/@farvell/jflow-core/src/handler.js ***!
  \*********************************************************/
/***/ ((module) => {

// Generic handler
module.exports = class Handler {

	// Animation { element: idName, css: className || [className] }
	constructor( ...animations ) {

		this.animations = [];
		this._initAnimations( animations );

		// Return event methods
		return Object.freeze( Object.create({

			onTimeout: this.onTimeout.bind( this ),
			onClick: this.onClick.bind( this ),
			onScroll: this.onScroll.bind( this )

		}));
	}

	// Setting animations object and css array
	_initAnimations( animations ) {
		animations.forEach(( anim, index ) => {
			this.animations.push({
				element: document.getElementById( anim.element ),
				css: Array.isArray( anim.css ) ? anim.css : [ anim.css ]
			});

			this._setDefaultAnimation( index );
		});
	}

	// If css provided is an array
	_setDefaultAnimation( index ) {
		const animation = this.animations[ index ],
			element = animation.element,
			css = animation.css;

		if ( css.length > 1 ) this._toggleAnimation( element, css[ 0 ]);
	}

	// Toggle class list item
	_toggleAnimation( element, css ) { element.classList.toggle( css ); }

	// For each animation, animate
	_animate() {
		this.animations.forEach(( animation ) => {
			animation.css.forEach(( cssName ) => {
				this._toggleAnimation( animation.element, cssName );
			});
		});
	}

	// Timeout event, animate given time
	async onTimeout( time ) {
		setTimeout(() => {
			this._animate();
		}, time );

		return this;
	}

	// Click event triggers animation
	async onClick( controls ) {
		const keys = document.querySelectorAll( `.${controls}` );

		keys.forEach(( trigger ) => {
			trigger.addEventListener( "click", ( e ) => {
				e.stopPropagation();
				this._animate();
			});
		});

		return this;
	}

	// If Offset is inside conditions, animate
	_triggerScroll( scroll, offset, scrolled ) {
		if (( scroll <= offset && scrolled ) ||
			( scroll >= offset && !scrolled )) {

			this._animate();
			return !scrolled;
		}

		return scrolled;
	}

	// Controls scroll when loads document
	_initScroll( offset ) {
		if ( window.scrollY >= offset ) {
			this._animate();
			return true;
		}

		return false;
	}

	// Scroll event triggers animation
	async onScroll( offset ) {
		let scrolled = this._initScroll( offset );

		document.addEventListener( "scroll", () => {
			const scroll = window.scrollY;
			scrolled = this.triggerScroll( scroll, offset, scrolled );
		});

		return this;
	}

};

/***/ }),

/***/ "./node_modules/@farvell/jflow-core/src/parallax.js":
/*!**********************************************************!*\
  !*** ./node_modules/@farvell/jflow-core/src/parallax.js ***!
  \**********************************************************/
/***/ ((module) => {

/* Parallax movement */
module.exports = class Parallax {

	// ... HTMLElement, dir 1 = up | -1 = down, minOffset in pixels to active scroll
	constructor( ...config ) {

		// Init multiple configs
		this.config = [];
		this._initConfig( config );
		// Need updates movement at restart
		// Prevents charging scroll at re-render position
		this._updateMovement();

		// Return listen to move scroll
		return Object.freeze( Object.create({

			listen: this.listen.bind( this )

		}));
	}

	// Sets config params scroll direction, speed , offset
	_initConfig( config ) {
		config.forEach(( param ) => {
			this.config.push({
				target: document.getElementById( param.target ),
				direction: param.direction,
				offset: ( param.offset ? param.offset : 0 )
			});
		});
	}

	// Updates movement relative on direction and offset
	_updateMovement( offset = window.scrollY ) {
		// For each parallax configuration object
		this.config.forEach(( value ) => {
			const style = value.target.style,
				movement = ( offset - value.offset ) * value.direction;

			// Only executes if offset arrives to minOffset
			if ( offset >= value.offset )
				style.transform = `translateY( ${ movement }px)`;
		});
	}

	// Real scroll param with request Animation
	_render( offset ) {
		window.requestAnimationFrame(() => {
			this._updateMovement( offset );
		});
	}

	// Event handler for scroll
	async listen() {
		window.addEventListener( "scroll", () => {
			const offset = window.scrollY;
			this._render( offset );
		});
	}

};


/***/ }),

/***/ "./node_modules/@farvell/jflow-core/src/style.js":
/*!*******************************************************!*\
  !*** ./node_modules/@farvell/jflow-core/src/style.js ***!
  \*******************************************************/
/***/ ((module) => {

// Converts style objetcs into html props.
module.exports = class Style {
	constructor( styles ) {
		// Object containig style keys
		this.styles = styles;

		// Return set styles
		return Object.freeze( Object.create({

			setStyles: this.setStyles.bind( this )

		}));
	}

	// Set styles to targets clasName
	setStyles( className ) {
		this.elements = [ ...document.getElementsByClassName( className ) ];

		this.elements.forEach(( element ) => {
			const props = Object.keys( this.styles );

			props.forEach(( key ) => {
				element.style.key = key;
			});
		});

		return this.elements;
	}
};

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _farvell_jflow_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @farvell/jflow-core */ "./node_modules/@farvell/jflow-core/index.js");
/* harmony import */ var _farvell_jflow_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_farvell_jflow_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
// Import modules
 // Webpack styles

 // Init Web

var initPage = function initPage() {
  var loader = new _farvell_jflow_core__WEBPACK_IMPORTED_MODULE_0__.Handler({
    element: "loader",
    css: "disappear"
  });
  return loader.onTimeout(1600);
}; // Main function


window.addEventListener("load", function () {
  initPage().then(function () {
    return console.log("Say hello!");
  });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map