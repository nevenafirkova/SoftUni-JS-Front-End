const apiURL = "http://localhost:3030/jsonstore/advanced/articles/";
const sectionMain = document.querySelector("#main");

async function solution() {
    let data = await ((await fetch(`${apiURL}list`)).json());

    for (let obj of data) {
        let container = createDivElement("accordion");

        let header = createDivElement("head");
        let span = document.createElement("span");
        span.textContent = obj.title;
        let toggleBtn = document.createElement("button");
        toggleBtn.classList.add("button");
        toggleBtn.textContent = "More";
        toggleBtn.id = obj._id;
        toggleBtn.addEventListener("click", toggleExtraText);
        header.appendChild(span);
        header.appendChild(toggleBtn);

        let extraInfo = createDivElement("extra");
        let paragraph = document.createElement("p");

        let extraText = await ((await fetch(`${apiURL}details/${obj._id}`)).json());
        paragraph.textContent = extraText.content;

        extraInfo.appendChild(paragraph);

        container.appendChild(header);
        container.appendChild(extraInfo);

        sectionMain.appendChild(container);
    };
}

function createDivElement(className) {
    let div = document.createElement("div");
    div.classList.add(className);

    return div
};

function toggleExtraText(event) {
    let currentBtn = event.target;
    const isClosed = currentBtn.textContent === "More";

    currentBtn.textContent = isClosed ? "Less" : "More";

    let content = currentBtn.parentElement.parentElement.querySelector(".extra");
    content.style.display = isClosed ? "block" : "none";

};

solution()