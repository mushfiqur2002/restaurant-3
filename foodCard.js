import { fetchData, currentPage } from './category.js';

const cardContainer = document.querySelector(".cardsContainer .cards");

async function loadData() {
    const data = await fetchData(); // Await the fetchData call
    displayCard(data);
    console.log(data); // Use the fetched data
}

function displayCard(items) {
    let selectItem = items;

    // Check if current page is 'index.html' or ""
    if (currentPage === 'index.html' || currentPage === "") {
        // Filter items to only those with a star rating above 4.5
        selectItem = items.filter(item => item.star > 4.5).slice(0, 4); // Show only the first 4 items
    }

    let element = selectItem.map(function(item) {
        return `<div class="card">
                    <div class="addCart">
                        <button class="btn"><i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                    <div class="image">
                        <img src="${item.image}">
                    </div>
                    <div class="dtls">
                        <div class="text">
                            <p>${item.name}</p>
                            <p>${item.description}</p>
                        </div>
                        <div class="tagging">
                            <p>$${item.price}</p>
                            <p><i class="fa-solid fa-star"></i>${item.star}</p>
                        </div>
                    </div>
                </div>`;
    }).join('');

    cardContainer.innerHTML = element;
}

loadData();
