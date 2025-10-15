// script for index.html
import { createHeaderLeft, createHeaderRight } from "./components.js";
import { parse } from "./csvParser.js";
async function createUpdateLog(){
    let textResult = await fetch("data/updatelog.csv")
        .then((res) => (res.text()))
        .then((text) => text.toString())
        .catch((e) => console.error(e));

    let csvData = parse(textResult);
    csvData = csvData.map((entry) => {
        let date = new Date(Date.parse(entry[0]));
        let string = entry[1];
        return [date, string];
    });
    // sort dates
    csvData.sort((a, b) => {
        return a[0] - b[0];
    });
    csvData.reverse(); 
    console.log(csvData);
    // is there a better way to do this?
    // check what file I'm being called in

    let contentNode = document.querySelector("div.content");
    // need an inner div to center elements
    let outerDiv = document.createElement("div");
    contentNode.insertAdjacentElement("afterbegin",outerDiv)
    csvData.map((dataElem) => {
        let contentString = ""
        // instead of using a content string, we insert inner divs
        let innerDiv = document.createElement("div");
        
        contentString += `[: ${dataElem[0].toLocaleDateString()} :]`;
        contentString += " ";
        contentString += dataElem[1];
        contentString += "<br>";
        contentString += "\n"
        innerDiv.insertAdjacentHTML("afterbegin",contentString);
        outerDiv.appendChild(innerDiv);  
    })
}


createHeaderLeft();
await createUpdateLog();
createHeaderRight();
let contentNode = document.querySelector("div.content");
resizeObserver(contentNode);
addEventListener("resize",           (event) => { resizeObserver(contentNode); }); 
addEventListener("load",             (event) => { resizeObserver(contentNode); });
addEventListener("DOMContentLoaded", (event) => { resizeObserver(contentNode); });