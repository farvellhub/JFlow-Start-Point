import LightboxHandler from "./lightboxHandler";

// Lightbox gallery
export default class Lightbox {

    constructor( data ) {
        
        this._constructData( data );
        this._constructHandler( data["animation"] );

        this._initRoullette();

        return Object.freeze(Object.create({

            listen: this.listen.bind( this )
            
        }));
    }

    _constructData( data ) {
        this.images = document.querySelectorAll( data["images"] );
        this.texts = document.querySelectorAll( data["texts"] );

        this.lightbox = {
            photo: document.getElementById( data["photo"] ),
            caption: document.getElementById( data["caption"] ),
        };

        this.roullette = {
            img: document.getElementById( data["roullette"] ),
            txt: []
        };
    }

    _constructHandler( animation ) {
        this.handler = new LightboxHandler( animation );
        this.exit = "lightbox-close";
        this.conditions = {
            roullette: "roullette-image",
            previous: "previous-button", 
            next: "next-button",
            length: 2
        };
    }

    _initRoullette() {
        this.images.forEach(( e, i ) => {
            const image = e.cloneNode(),
                text = this.texts[ i ];

            image.classList.remove( ...image.classList );
            image.classList.add( "roullette-image", "lightbox-control" );

            this.roullette.img.appendChild( image );
            this.roullette.txt.push( text.textContent );
        });

        this.lightboxSize = this.roullette.txt.length;
    }

    _setPhoto( src ) { this.lightbox.photo.src = src; }

    _setCaption( text ) { this.lightbox.caption.textContent = text; }

    _setLastPosition( position ) { this.lastPosition = position; }

    _updateFromAll( position ) {
        const photo = this.roullette.img.children,
            caption = this.roullette.txt;

        console.log( "photo: %o", photo[ position ] );
        console.log( "caption: %o", caption[ position ] );
        console.log( "position: %o", position );

        this._setPhoto( photo[ position ].src );
        this._setCaption( caption[ position ] );
    }

    _updateFromPrevious() {
        const position = this.lastPosition > 0
            ? --this.lastPosition 
            : this.lightboxSize;

        this._updateFromAll( position );
        
        return position;
    }

    _updateFromNext() {
        const position = this.lastPosition < this.lightboxSize
            ? ++this.lastPosition 
            : 0;

        this._updateFromAll( position );

        return position;
    }

    _updateFromRoullette( index ) {
        const length = this.conditions.length,
            position = index - length;

        this._updateFromAll( position );

        return position;
    }

    _updateFromImages( index ) {
        const length = this.conditions.length,
            position = ( index - this.lightboxSize)  - length;

        this._updateFromAll( position );

        return position;
    }

    _validUpdate ( classList, name ) {
        const conditions = this.conditions;

        return classList.contains( conditions[ name ]);
    }

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

    _update() {
        
        const lastClick = this.handler.lastClicked(),
            classList = lastClick.element.classList;
            
        if ( classList.contains( this.exit ) ) return;

        this._updateFrom( classList, lastClick.index );
    }

    listen() {
        this.handler.setAfterFunc( this._update, this ); 
        return this.handler.onClick( ".lightbox-control", this.conditions ); 
    }
}