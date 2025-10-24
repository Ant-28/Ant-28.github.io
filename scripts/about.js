// script for about.html -- follows the same template as index but extensible if I want to add more things
import { createHeaderLeft, createHeaderRight, resizeObserver } from "./components.js";


createHeaderLeft();
createHeaderRight();
let contentNode = document.querySelector("div.content-abt");
resizeObserver(contentNode, contentNode);

addEventListener("resize",           (event) => { resizeObserver(contentNode, contentNode); }); 
addEventListener("load",             (event) => { resizeObserver(contentNode, contentNode); });
addEventListener("DOMContentLoaded", (event) => { resizeObserver(contentNode, contentNode); });