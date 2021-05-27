// Import modules
import Handler from "./api/eventHandler";

// Webpack styles
import "./styles/index.scss";

// Init Web
const initPage = () => {
    return new Promise(( resolve ) => {
        const loader = new Handler({
            element: "loader",
            css: "disappear"
        });

        resolve( loader.onTimeout( 1600 ) );
    });
};

// Main function
window.addEventListener("load", () => {
    initPage()
        .then(() => console.log( "Say hello!" ));
});