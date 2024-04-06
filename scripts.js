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

console.log(records);

let display_selection = records;

function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");

    for (record of display_selection) {
        const nextCard = templateCard.cloneNode(true); // Copy the template card
        editCardContent(nextCard, record.title, record.image); // Edit title and image
        cardContainer.appendChild(nextCard); // Add new card to the container
    }
}

function editCardContent(card, newTitle, newImageURL) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newTitle;

    // const cardImage = card.querySelector("img");
    // cardImage.src = newImageURL;
    // cardImage.alt = newTitle + " Poster";

    // console.log("new card:", newTitle, "- html: ", card);
}

function loadSearch() {
    const search_bar = document.querySelector(".search-bar");
    search_bar.addEventListener("input", search);
    search_bar.addEventListener("submit", (event) => event.preventDefault());
}

document.addEventListener("DOMContentLoaded", showCards);
document.addEventListener("DOMContentLoaded", loadSearch);

function search(event) {
    const search_input = document.getElementById("search");
    event.preventDefault();
    console.log("Searching", search_input.value);

    display_selection = records.filter((record) =>
        record.title.toLowerCase().includes(search_input.value.toLowerCase()),
    );
    showCards();
}

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
