/* API Css animations */

export default class Handler {

    constructor( ...animations ) {
        this.animations = [];
        this._initAnimations( animations );

        return Object.freeze(Object.create({

            onTimeout: this.onTimeout.bind( this ),
            onClick: this.onClick.bind( this ),
            onScroll: this.onScroll.bind( this )

        }));
    }

    _initAnimations( animations ) {
        animations.forEach(( a, i ) => {
            this.animations.push({
                element: document.getElementById( a.element ),
                css: Array.isArray( a.css ) ? a.css : [ a.css ]
            });

            this._setDefaultAnimation( i );
        });
    }

    _setDefaultAnimation( index ) {
        const animation = this.animations[ index ],
            element = animation.element,
            css = animation.css;

        if ( css.length > 1 )
            this._toggleAnimation( element, css[0] );
    }

    _toggleAnimation( element, css ) { element.classList.toggle( css ); }

    _animate() {
        this.animations.forEach(( animation ) => {
            animation.css.forEach(( cssName ) => {
                this._toggleAnimation( animation.element, cssName );
            });        
        });
    }

    onTimeout( time ) {
        setTimeout(() => {
            this._animate(); 
        }, time);

        return this;
    }

    onClick( controls ) {
        const keys = document.querySelectorAll( `.${controls}` );

        keys.forEach(( e ) => {
            e.addEventListener("click", () => {
                this._animate();
            });
        });

        return this;
    }

    _initScroll( offset ) {
        if ( window.scrollY >= offset ) {
            this._animate();
            return true;
        }

        return false;
    }

    onScroll( offset ) {
        let scrolled = this._initScroll( offset );

        document.addEventListener("scroll", () => {
            const scroll = window.scrollY;

            if (( scroll <= offset && scrolled ) || 
                ( scroll >= offset && !scrolled )) {
                
                scrolled  = !scrolled;
                this._animate();
            }
        });

        return this;
    }

}