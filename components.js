import { parse } from "./csvParser.js";
const appendNewElement = (parent, childName) => 
    {return parent.appendChild(document.createElement(childName));}

// return nothing, this just modifies document state
// direction: left or right
function createHeader(direction){
    let bodyNode = document.querySelector("body");
    if(direction !== "left" && direction !== "right") {return;}

    let pifHeader;
    if(direction === "right"){
        pifHeader = appendNewElement(bodyNode, "div");
    }
    else {
        
        pifHeader = bodyNode.insertBefore(document.createElement("div"), bodyNode.children[0])
    }
    pifHeader.setAttribute("class", "pifheader" + direction)
    headerElem(pifHeader, "index.html", "[: Home :]")
    headerElem(pifHeader, "about.html", "[: About :]")
    headerElem(pifHeader, "https://ant-28.github.io/blog", "[: Blog :]")
    headerElem(pifHeader, "faq.html", "[: FAQ :]")
    headerElem(pifHeader, "contact.html", "[: Contact :]")
    
}


// create left header
const createHeaderLeft = () => createHeader("left")
// create right header
const createHeaderRight = () => createHeader("right")

// parentNode: Node -> URL: String -> textContent: String -> Node
function headerElem(parentNode, uri, textContent){
    // we want an a element
    let newanchor = appendNewElement(parentNode, "a")
    newanchor.setAttribute("href", uri)
    newanchor.textContent = textContent
    return newanchor
}
// create log
async function createUpdateLog(){
    let textResult = await fetch("data/updatelog.csv")
        .then((res) => (res.text()))
        .then((text) => text.toString())
        .catch((e) => console.error(e));

    let csvData = parse(textResult);
    csvData = csvData.map((entry) => {
        let date = new Date(Date.parse(entry[0]));
        let string = entry[1];
        return [date, string]
    });
    // sort dates
    csvData.sort((a, b) => {
        return a[0] - b[0];
    });
    csvData.reverse(); 
    console.log(csvData);
    // is there a better way to do this?
    // check what file I'm being called in
    if(["/", "/index.html"].includes(window.location.pathname)){
        let contentNode = document.querySelector("div.content");
        let contentString = "<div>"
        csvData.map((dataElem) => {
            contentString += `<div>[: ${dataElem[0].toLocaleDateString()} :]`;
            contentString += " ";
            contentString += dataElem[1];
            contentString += "</div><br>";
            contentString += "\n"
            console.log(contentString);
        })
        contentString += "</div>"
        contentNode.innerHTML = contentString;
    }
}
// create index html
createHeaderLeft();
await createUpdateLog()
createHeaderRight();


