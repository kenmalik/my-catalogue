/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

const imageDir = "./assets/images/";
let collection = records;
let displayed = collection;

function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");

    for (record of displayed) {
        const nextCard = templateCard.cloneNode(true);
        nextCard.id = record.id;
        editCardContent(
            nextCard,
            record.title,
            record.year,
            imageDir + record.image_src,
        );

        nextCard.querySelector(".front").id = record.id + "-front";

        nextCard.querySelector(".back").id = record.id + "-back";
        nextCard.querySelector(".back h2").innerText =
            record.title + " (" + record.year + ")";

        const info = nextCard.querySelector(".back .info");

        if (record.label) {
            const label = document.createElement("p");
            const header = document.createElement("b");
            header.appendChild(document.createTextNode("Label: "));
            label.appendChild(header);
            label.appendChild(document.createTextNode(record.label));
            info.appendChild(label);
        }

        if (record.artists) {
            const header = document.createElement("h3");
            header.appendChild(document.createTextNode("Personnel:"));
            info.appendChild(header);

            const personnel = document.createElement("ul");
            for (person of record.artists) {
                const personItem = document.createElement("li");
                personItem.appendChild(document.createTextNode(person));
                personnel.appendChild(personItem);
            }
            info.appendChild(personnel);
        }

        if (record.tracklist) {
            const header = document.createElement("h3");
            header.appendChild(document.createTextNode("Tracklist:"));
            info.appendChild(header);

            const tracklist = document.createElement("ul");
            for (track of record.tracklist) {
                const trackItem = document.createElement("li");
                trackItem.appendChild(document.createTextNode(track));
                tracklist.appendChild(trackItem);
            }
            info.appendChild(tracklist);
        }

        if (record.info) {
            const header = document.createElement("h3");
            header.appendChild(document.createTextNode("Additional Info:"));
            info.appendChild(header);
            const infoItem = document.createElement("p");
            infoItem.innerText = record.info;
            info.appendChild(infoItem);
        }

        if (record.video_url) {
            const line = document.createElement("p");
            line.style.textAlign = "center";
            line.style.marginTop = "4em";
            const link = document.createElement("a");
            link.innerText = "Video";
            link.href = record.video_url;
            link.rel = "noopener noreferrer";
            link.target = "_blank";
            line.appendChild(link);
            info.appendChild(line);
        }

        nextCard.querySelector(".front").style.display = "flex";

        cardContainer.appendChild(nextCard);
        loadFrontButtons(nextCard.id);
    }
}

function loadFrontButtons(cardId) {
    const card = document.getElementById(cardId);

    const favoriteButton = card.querySelectorAll("button")[0];
    setFavoriteButtonStyles(favoriteButton, record.favorited);
    favoriteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        handleFavorite(favoriteButton, Number(card.id));
    });

    const editButton = card.querySelectorAll("button")[1];
    editButton.addEventListener("click", (event) => {
        event.stopPropagation();
        console.log("Edit clicked");
        handleEdit(Number(card.id));
    });

    const deleteButton = card.querySelectorAll("button")[2];
    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        handleDelete(Number(card.id));
    });
}

function handleEdit(id) {
    const record = records.find((record) => record.id === id);
    let newTitle = prompt("Enter new title:", record.title);
    if (newTitle !== "") {
        record.title = newTitle;
    }
    let newYear = prompt("Enter new year:", record.year);
    if (newYear !== "" && !isNaN(newYear)) {
        record.year = newYear;
    }
    let newImage = prompt("Enter new image_src:", record.image);
    if (newImage !== "") {
        record.image_src = newImage;
    }
    updateDisplay();
}

function handleFavorite(button, id) {
    const object = records.find((record) => record.id === id);
    object.favorited = !object.favorited;
    setFavoriteButtonStyles(button, object.favorited);
    // updateDisplay();
}

function handleDelete(id) {
    records = records.filter((record) => record.id !== id);
    collection = collection.filter((record) => record.id !== id);
    updateDisplay();
}

function setFavoriteButtonStyles(button, isFavorited) {
    button.textContent = isFavorited ? "Unfavorite" : "Favorite";
    button.style.backgroundColor = isFavorited ? "#15803d" : "";
    button.style.color = isFavorited ? "white" : "";
}

function editCardContent(card, newTitle, newYear, newImageURL) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newTitle;

    const cardYear = card.querySelector("h3");
    cardYear.textContent = "(" + newYear + ")";

    const cardImage = card.querySelector("img");
    cardImage.src = newImageURL;
    cardImage.alt = newTitle + " album cover";
}

function updateDisplay() {
    displayed = collection;
    applyFilter();
    applySearch();
    applySort();

    const resultCounter = document.querySelector("#nav-bar p");
    resultCounter.textContent =
        displayed.length + (displayed.length !== 1 ? " results" : " result");

    showCards();
}

function chooseEra(lowYear, highYear) {
    collection = records.filter(
        (record) => record.year >= lowYear && record.year <= highYear,
    );
    updateDisplay();
}

function applyFilter() {
    const filterMethod = document.getElementById("filter-select").value;
    if (filterMethod === "Favorites") {
        displayed = displayed.filter((record) => record.favorited === true);
    }
}

function applySearch() {
    const searchInput = document.getElementById("search");
    displayed = displayed.filter((record) =>
        record.title.toLowerCase().includes(searchInput.value.toLowerCase()),
    );
}

function applySort() {
    const sortMethod = document.getElementById("sort-select").value;
    if (sortMethod === "Year Ascending") {
        displayed = displayed.sort(
            (recordA, recordB) => recordA.year - recordB.year,
        );
    } else if (sortMethod === "Year Descending") {
        displayed = displayed.sort(
            (recordA, recordB) => recordB.year - recordA.year,
        );
    }
}

function loadSearchBar() {
    document
        .querySelector(".search-bar")
        .addEventListener("submit", (event) => event.preventDefault());
    document.getElementById("search").addEventListener("input", updateDisplay);
    document
        .getElementById("sort-select")
        .addEventListener("change", updateDisplay);
    document
        .getElementById("filter-select")
        .addEventListener("change", updateDisplay);
}

document.addEventListener("DOMContentLoaded", updateDisplay);
document.addEventListener("DOMContentLoaded", loadSearchBar);

function quoteAlert() {
    console.log("Button Clicked!");
    alert(
        "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!",
    );
}

function removeLastCard() {
    records.pop(); // Remove last item in titles array
    showCards(); // Call showCards again to refresh
}

function addColorOverlay(card) {
    let overlay = document.createElement("div");
    overlay.id = card.id + "-overlay";
    overlay.style.position = "absolute";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(7, 89, 133, 0.4)";
    overlay.style.color = "white";
    overlay.style.fontSize = "1.5em";
    overlay.style.fontWeight = "bolder";
    overlay.style.paddingTop = "5em";
    overlay.style.textAlign = "center";
    overlay.style.borderRadius = "5px";
    overlay.style.pointerEvents = "none";
    overlay.style.boxSizing = "border-box";
    overlay.textContent = "Click to flip";
    card.appendChild(overlay);
}

function removeColorOverlay(card) {
    const overlayId = card.id + "-overlay";
    const overlay = document.getElementById(overlayId);
    if (overlay) {
        overlay.remove();
    }
}

function flipCard(card) {
    if (document.getElementById(card.id + "-front").style.display == "flex") {
        document.getElementById(card.id + "-front").style.display = "none";
        document.getElementById(card.id + "-back").style.display = "flex";
    } else {
        document.getElementById(card.id + "-back").style.display = "none";
        document.getElementById(card.id + "-front").style.display = "flex";
    }

    removeColorOverlay(card);
}
