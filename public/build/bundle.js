/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/eventHandler.js":
/*!*********************************!*\
  !*** ./src/api/eventHandler.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Handler)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* API Css animations */
var Handler = /*#__PURE__*/function () {
  function Handler() {
    _classCallCheck(this, Handler);

    this.animations = [];

    for (var _len = arguments.length, animations = new Array(_len), _key = 0; _key < _len; _key++) {
      animations[_key] = arguments[_key];
    }

    this._initAnimations(animations);

    return Object.freeze(Object.create({
      onTimeout: this.onTimeout.bind(this),
      onClick: this.onClick.bind(this),
      onScroll: this.onScroll.bind(this)
    }));
  }

  _createClass(Handler, [{
    key: "_initAnimations",
    value: function _initAnimations(animations) {
      var _this = this;

      animations.forEach(function (a, i) {
        _this.animations.push({
          element: document.getElementById(a.element),
          css: Array.isArray(a.css) ? a.css : [a.css]
        });

        _this._setDefaultAnimation(i);
      });
    }
  }, {
    key: "_setDefaultAnimation",
    value: function _setDefaultAnimation(index) {
      var animation = this.animations[index],
          element = animation.element,
          css = animation.css;
      if (css.length > 1) this._toggleAnimation(element, css[0]);
    }
  }, {
    key: "_toggleAnimation",
    value: function _toggleAnimation(element, css) {
      element.classList.toggle(css);
    }
  }, {
    key: "_animate",
    value: function _animate() {
      var _this2 = this;

      this.animations.forEach(function (animation) {
        animation.css.forEach(function (cssName) {
          _this2._toggleAnimation(animation.element, cssName);
        });
      });
    }
  }, {
    key: "onTimeout",
    value: function onTimeout(time) {
      var _this3 = this;

      setTimeout(function () {
        _this3._animate();
      }, time);
      return this;
    }
  }, {
    key: "onClick",
    value: function onClick(controls) {
      var _this4 = this;

      var keys = document.querySelectorAll(".".concat(controls));
      keys.forEach(function (e) {
        e.addEventListener("click", function () {
          _this4._animate();
        });
      });
      return this;
    }
  }, {
    key: "_initScroll",
    value: function _initScroll(offset) {
      if (window.scrollY >= offset) {
        this._animate();

        return true;
      }

      return false;
    }
  }, {
    key: "onScroll",
    value: function onScroll(offset) {
      var _this5 = this;

      var scrolled = this._initScroll(offset);

      document.addEventListener("scroll", function () {
        var scroll = window.scrollY;

        if (scroll <= offset && scrolled || scroll >= offset && !scrolled) {
          scrolled = !scrolled;

          _this5._animate();
        }
      });
      return this;
    }
  }]);

  return Handler;
}();



/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_eventHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/eventHandler */ "./src/api/eventHandler.js");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
// Import modules
 // Webpack styles

 // Init Web

var initPage = function initPage() {
  return new Promise(function (resolve) {
    var loader = new _api_eventHandler__WEBPACK_IMPORTED_MODULE_0__.default({
      element: "loader",
      css: "disappear"
    });
    resolve(loader.onTimeout(1600));
  });
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