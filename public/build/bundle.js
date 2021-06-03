/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@farvell/jflow-core/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@farvell/jflow-core/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Handler = __webpack_require__( /*! ./src/eventHandler */ "./node_modules/@farvell/jflow-core/src/eventHandler.js" ),
    Lightbox = __webpack_require__( /*! ./src/Lightbox/lightbox */ "./node_modules/@farvell/jflow-core/src/Lightbox/lightbox.js" ),
    Parallax = __webpack_require__( /*! ./src/parallaxText */ "./node_modules/@farvell/jflow-core/src/parallaxText.js" ),
	Style = __webpack_require__( /*! ./src/style */ "./node_modules/@farvell/jflow-core/src/style.js" );

module.exports = {
    Handler,
	Style,
    Lightbox,
    Parallax
};


/***/ }),

/***/ "./node_modules/@farvell/jflow-core/src/Lightbox/lightbox.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@farvell/jflow-core/src/Lightbox/lightbox.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const LightboxHandler = __webpack_require__( /*! ./lightboxHandler */ "./node_modules/@farvell/jflow-core/src/Lightbox/lightboxHandler.js" ),
	LightboxConstructor = __webpack_require__( /*! ./lightboxConstructor */ "./node_modules/@farvell/jflow-core/src/Lightbox/lightboxConstructor.js" );

// Lightbox logic and constructor
module.exports = class Lightbox {

    // fetching data classes to control lightbox
    constructor( config ) {
        // Set param config
		this.config = new LightboxConstructor( config );

        // Initializing handler
        this.handler = new LightboxHandler({
            element: "lightbox",
            css: data["css"]
        });

        // Init roullette of images
        this._initRoullette();

        // Return listen lightbox
        return Object.freeze(Object.create({

            listen: this.listen.bind( this )
            
        }));
    }

    // initializing roullette from fetched images
    _initRoullette() {
        this.config.images.forEach(( e, i ) => {
            const image = e.cloneNode(),
                text = this.config.texts[ i ];

            // Reset image element to lightbox css classes
            image.classList.remove( ...image.classList );
            image.classList.add( "roullette-image", this.control );

            // Pushing images to roullete
            this.config.roullette.img.appendChild( image );
            this.config.roullette.txt.push( text.textContent );
        });

        // Finally sets the lightbox size to length of roullette
        this.lightboxSize = this.config.roullette.txt.length;
    }

    // SETTERS
    _setPhoto( src ) { this.config.lightbox.photo.src = src; }
    _setCaption( text ) { this.config.lightbox.caption.textContent = text; }

    // Update position ( certain positions are conditioned buttons )
    _setLastPosition( position ) { this.lastPosition = position; }

    _updateFromAll( position ) {
        const photo = this.config.roullette.img.children,
            caption = this.config.roullette.txt;

        this._setPhoto( photo[ position ].src );
        this._setCaption( caption[ position ] );
    }

    // Update from previous button
    _updateFromPrevious() {
        const position = this.lastPosition > 0
            ? --this.lastPosition 
            : this.lightboxSize;

        this._updateFromAll( position );
        
        return position;
    }

    // Update from next button
    _updateFromNext() {
        const position = this.lastPosition < this.lightboxSize
            ? ++this.lastPosition 
            : 0;

        this._updateFromAll( position );

        return position;
    }

    // Update from roullete image
    _updateFromRoullette( index ) {
        const length = this.config.conditions.length,
            position = index - length;

        this._updateFromAll( position );

        return position;
    }

    // Update from grid of images
    _updateFromImages( index ) {
        const length = this.config.conditions.length,
            position = ( index - this.lightboxSize)  - length;

        this._updateFromAll( position );

        return position;
    }

    // If conditions return True
    _validUpdate ( classList, name ) {
        const conditions = this.config.conditions;

        return classList.contains( conditions[ name ]);
    }

    // Route depending on position
    _updateFrom( classList, index ) {
        let position;

        if ( this._validUpdate( classList, "roullette" ) ) {
            position = this._updateFromRoullette(index);

        } else if ( this._validUpdate( classList, "previous" ) ) {
            position = this._updateFromPrevious();

        } else if ( this._validUpdate( classList, "next" ) ) {
            position = this._updateFromNext();

        } else { position = this._updateFromImages( index ); }

        this._setLastPosition( position );
    }

    // Update state from all conditions
    _update() {
        
        const lastClick = this.handler.lastClicked(),
            classList = lastClick.element.classList;
            
        if ( classList.contains( this.config.exit ) ) return;

        this._updateFrom( classList, lastClick.index );
    }

    // Listener handler
    async listen() {
        this.handler.setAfterFunc( this._update, this ); 
        return this.handler.onClick( this.config.control, this.conditions )
			.then( console.log( "Lightbox is working!" ) );
    }
}

/***/ }),

/***/ "./node_modules/@farvell/jflow-core/src/Lightbox/lightboxConstructor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@farvell/jflow-core/src/Lightbox/lightboxConstructor.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Style = __webpack_require__( /*! ../style */ "./node_modules/@farvell/jflow-core/src/style.js" );

// Lightbox DOM constructor

module.exports = class LightboxConstructor {
	constructor( config ) {
		this._createLightbox();
		this._styleLightbox( config.color );
		
		return this._setLightboxConfig( config )
	}
	
    // Setting lightbox properties
	_setLightboxConfig( config ) {
		return {
			images: document.querySelectorAll( config["images"] ),
			texts: document.querySelectorAll( config["texts"] ),
			lightbox: {
				photo: document.getElementById( "lighbox-photo" ),
				caption: document.getElementById( "lightbox-caption" ),
			},
			roullette: {
				img: document.getElementById( "lightbox-roullette" ),
				txt: []
			},
			control: ".lightbox-control",
        	exit: "lightbox-close",
        	conditions: {
           		roullette: "roullette-image",
            	previous: "previous-button", 
            	next: "next-button",
            	length: 2
			}
        };
	}

	// Putting lightbox html to DOM
	_createLightbox() {
		const body = document.getElementsByTagName( body );

		body.innerHTML += `
			<section id="lightbox" class="fixed-wrapper lightbox-wrapper">
				<span class="button fixed-button lightbox-close lightbox-control">x</span>

				<section class="wrapper lightbox">
					<figure class="wrapper lightbox-photo-wrapper">
						<article class="lightbox-previous">
							<span class="button lightbox-button vertical-align previous-button lightbox-control"><</span>
						</article>
						<img id="lightbox-photo" class="lightbox-photo all-align" src="#" alt="lightbox-main-photo">
						<article class="lightbox-next">
							<span class="button lightbox-button vertical-align next-button lightbox-control"><</span>
						</article>
					</figure>
				</section>

				<p id="lightbox-caption" class="horizontal-align lightbox-caption"></p>
				<nav id="lightbox-roullette" class="horizontal-align roullette"></nav>
			</section>
		`;

		body.style.position = "relative";
	}

	_styleLightbox( color = "rgba( 12,12,12, 0.9)" ) {
		new Style({

			backgroundColor: color

		}).setStyles( "lightbox-wrapper" );
	}
}

/***/ }),

/***/ "./node_modules/@farvell/jflow-core/src/Lightbox/lightboxHandler.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@farvell/jflow-core/src/Lightbox/lightboxHandler.js ***!
  \**************************************************************************/
/***/ ((module) => {

// Lightbox event handler 

module.exports = class LightboxHandler {

    // ... Animation { element: idName, css: className || [className] }
    constructor( ...animations ) {

        // Init array of animations.
        this.animations = [];
        this._initAnimations( animations );

        // Return function to Lightbox logic
        return Object.freeze(Object.create({

            setAfterFunc: this.setAfterFunc.bind( this ),
            lastClicked: this.lastClicked.bind( this ),
            onClick: this.onClick.bind( this )

        }));
    }

    // Setting animations object and css array
    _initAnimations( animations ) {
        animations.forEach(( a ) => {
            this.animations.push({
                element: document.getElementById( a.element ),
                css: Array.isArray( a.css ) ? a.css : [ a.css ]
            });
        });
        
        this._setDefaultAnimation();
        
    }

    // If css provided is an array
    _setDefaultAnimation() {
        if ( this.animations.length > 1 ) {
            const animation = this.animations[0],
                element = animation.element,
                css = animation.css

            this._animateByCss( element, css[0] );
        }
    }

    // Needs for logic in Lightbox, controls roullette updates
    setAfterFunc( func, that, ...args ) {
        this._afterFunc = () => {
            if ( typeof func == "function"
                && typeof that == "object" )
                return that[ func.name ]( args );
        };

        return this;
    }

    // Only update animation if its condition returns true
    _isConditioned( conditions ) {
        if ( conditions === null ) return false;
            
        const classList = this.lastClick.element.classList;
        let isConditioned = false;

        Object.keys( conditions ).forEach(( c ) => {
            if ( classList.contains( conditions[ c ] ) ) 
                isConditioned = true;
        });

        return isConditioned;
    }

    // Toggle class list item
    _toggleAnimation( element, css ) { element.classList.toggle( css ); }

    // For each animation, animate
    _animate() {
        this.animations.forEach(( a ) => {
            a.css.forEach(( c ) => {
                this._toggleAnimation( a.element, c );
            });        
        });
    }

    // Controls if have conditions
    _trigger( conditions ) {
        if ( this._isConditioned( conditions ) ) return;

        this._animate();
    }

    // Execute all functions atached to the event
    _execution( conditions = null ) {
        this._trigger( conditions );
        
        if ( typeof this._afterFunc === "function" )
            this._afterFunc();
    }

    // Needs in Lightbox class, return last clicked element
    lastClicked() { return this.lastClick; }

    // Each click updates lastClick variable 
    async onClick( controls, conditions ) {
        const keys = document.querySelectorAll( controls );

        keys.forEach(( e, i ) => {
            e.addEventListener("click", () => {
                this.lastClick = { 
                    "element": e,
                    "index": (i - 1) 
                };

                this._execution( conditions );
            });
        });

        return this;
    }
}

/***/ }),

/***/ "./node_modules/@farvell/jflow-core/src/eventHandler.js":
/*!**************************************************************!*\
  !*** ./node_modules/@farvell/jflow-core/src/eventHandler.js ***!
  \**************************************************************/
/***/ ((module) => {

// Generic handler

module.exports = class Handler {

    // Animation { element: idName, css: className || [className] }
    constructor( ...animations ) {
        
        this.animations = [];
        this._initAnimations( animations );

        // Return event methods
        return Object.freeze(Object.create({

            onTimeout: this.onTimeout.bind( this ),
            onClick: this.onClick.bind( this ),
            onScroll: this.onScroll.bind( this )

        }));
    }

    // Setting animations object and css array
    _initAnimations( animations ) {
        animations.forEach(( a, i ) => {
            this.animations.push({
                element: document.getElementById( a.element ),
                css: Array.isArray( a.css ) ? a.css : [ a.css ]
            });

            this._setDefaultAnimation( i );
        });
    }

    // If css provided is not an array
    _setDefaultAnimation( index ) {
        const animation = this.animations[ index ],
            element = animation.element,
            css = animation.css;

        if ( css.length > 1 )
            this._toggleAnimation( element, css[0] );
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
        const timer = setTimeout(( e ) => {
            this._animate();
        }, time);
		
        return this;
    }

    // Click event triggers animation
    async onClick( controls ) {
        const keys = document.querySelectorAll( `.${controls}` );

        keys.forEach(() => {
            e.addEventListener("click", ( e ) => {
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

        document.addEventListener("scroll", ( e ) => {
            const scroll = window.scrollY;
			scrolled = this.triggerScroll( scroll, offset, scrolled );
        });

        return this;
    }

}

/***/ }),

/***/ "./node_modules/@farvell/jflow-core/src/parallaxText.js":
/*!**************************************************************!*\
  !*** ./node_modules/@farvell/jflow-core/src/parallaxText.js ***!
  \**************************************************************/
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
        return Object.freeze(Object.create({

            listen: this.listen.bind( this )

        }));
    }

    _initConfig( config ) {
        config.forEach(( parallax ) => {
            this.config.push({
                target: document.getElementById( parallax.target ),
                direction: parallax.direction,
                offset: ( parallax.offset ? value.offset : 0 )
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

    _render( offset ) {
        window.requestAnimationFrame(() => {
            this._updateMovement( offset );
        })
    }

    // Event handler for scroll
    async listen() {
        window.addEventListener("scroll", () => {
            const offset = window.scrollY;
            this._render( offset );
        });
    }
    
}


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
		return Object.freeze(Object.create({

			setStyles: this.setStyles.bind( this )

		}));

	}

	// Set styles to targets clasName
	setStyles( className ) {
		this.elements = [ ...document.getElementsByClassName( className ) ];

		this.elements.forEach(( element ) => {
			Object.keys( this.styles ).forEach(( key ) => {
				element.style.key = this.styles.key;
			});
		});

		return this.elements;
	}
}

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
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
// Import modules
var _require = __webpack_require__(/*! @farvell/jflow-core */ "./node_modules/@farvell/jflow-core/index.js"),
    Handler = _require.Handler; // Webpack styles



console.log(Handler); // Init Web

var initPage = function initPage() {
  return new Promise(function (resolve) {
    var loader = new Handler({
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