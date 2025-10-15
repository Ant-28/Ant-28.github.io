// script for faq.html -- follows the same template as index but extensible if I want to add more things
import { createHeaderLeft, createHeaderRight, resizeObserver } from "./components.js";


createHeaderLeft();
createHeaderRight();
// I don't like this but I need one resize on page load
resizeObserver(contentNode);
addEventListener("resize",           (event) => { resizeObserver(contentNode); }); 
addEventListener("load",             (event) => { resizeObserver(contentNode); });
addEventListener("DOMContentLoaded", (event) => { resizeObserver(contentNode); });
