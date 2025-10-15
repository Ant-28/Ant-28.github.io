// script for about.html -- follows the same template as index but extensible if I want to add more things
import { createHeaderLeft, createHeaderRight } from "./components.js";


createHeaderLeft();
createHeaderRight();
let contentNode = document.querySelector("div.content-faq");
resizeObserver(contentNode);

addEventListener("resize", (event) => {

        resizeObserver(contentNode);    
    
});
addEventListener("load", (event) => {
        resizeObserver(contentNode);    
});