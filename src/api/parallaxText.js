/* Parallax movement */

export default class Parallax {

    constructor( target, direction = 1, minOffset = 0 ) {
        this.target = document.getElementById( target );
        
        this. direction = direction;
        this.minOffset = minOffset;

        this._updateMovement();

        return Object.freeze(Object.create({

            serve: this.serve.bind( this )

        }));
    }

    _updateMovement() {
        const offset = window.scrollY,
            style = this.target.style,
            movement = ( offset - this.minOffset ) * this.direction;

        if ( offset > this.minOffset ) 
            style.transform = `translateY( ${ movement }px)`;
    }

    serve() {
        window.addEventListener("scroll", () => {
            this._updateMovement();
        })
    }

}
