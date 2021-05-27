// Lightbox event handler 

export default class LightboxHandler {

    constructor( ...animations ) {

        this.animations = [];
        this._initAnimations( animations );

        return Object.freeze(Object.create({

            setAfterFunc: this.setAfterFunc.bind( this ),
            lastClicked: this.lastClicked.bind( this ),
            onClick: this.onClick.bind( this )

        }));
    }

    _initAnimations( animations ) {
        animations.forEach(( a, i ) => {
            this.animations.push({
                element: document.getElementById( a.element ),
                css: Array.isArray( a.css ) ? a.css : [ a.css ]
            } );

            this._initCss( i );
        });
    }

    _initCss( index ) {
        const animation = this.animations[ index ],
            element = animation.element,
            css = animation.css;

        if ( css.length > 1 )
            this._animateByCss( element, css[0] );
    }

    setAfterFunc( func, that, ...args ) {
        this._afterFunc = () => {
            if ( typeof func == "function"
                && typeof that == "object" )
                return that[ func.name ]( args );
        };

        return this;
    }

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

    _animateByCss( element, css ) { element.classList.toggle( css ); }

    _animate() {
        this.animations.forEach(( a ) => {
            a.css.forEach(( c ) => {
                this._animateByCss( a.element, c );
            });        
        });
    }

    _trigger( conditions ) {
        if ( this._isConditioned( conditions ) ) return;

        this._animate();
    }

    _execution( conditions = null ) {
        this._trigger( conditions );
        
        if ( typeof this._afterFunc === "function" )
            this._afterFunc();
    }

    lastClicked() { return this.lastClick; }

    onClick( controls, conditions ) {
        const keys = document.querySelectorAll( controls );

        keys.forEach(( e, i ) => {
            e.addEventListener("click", () => {
                this.lastClick = { 
                    "element" : e,
                    "index" : (i - 1) 
                };

                console.log("click to %o at index %o!", e, i-1);
                this._execution( conditions );
            });
        });

        return this;
    }
}