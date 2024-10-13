import { fetchData } from './category.js';
import { currentPage } from './script.js';

const cardContainer = document.querySelector(".cardsContainer .cards");
const prevBtn = document.querySelector(".navigation #prevBtn");
const nextBtn = document.querySelector(".navigation #nextBtn");
let filterItems = [];
let allData = [];  // Store all data
let currentIndex = 0;
let cardShow = 4;
let screenSize = window.innerWidth;

if (screenSize < 950) {
    cardShow = 3;
}
if (screenSize < 900) {
    cardShow = 2;
}

async function loadData() {
    const data = await fetchData(); // Await the fetchData call
    allData = data;  // Store the fetched data

    // Check if current page is 'index.html' or ""
    if (currentPage === 'index.html' || currentPage === "") {
        // Filter data to only those with a star rating above 4.5
        filterItems = allData.filter(item => item.star > 4.5);
    } else if (currentPage === 'menu.html') {
        filterItems = allData; // Show all items in menu.html
    }
    displayCard(); // Display the initial set of cards
}

// Filter and display items based on selected category
export function filterAndDisplayItems(selectedCategory) {  // Export function
    if (selectedCategory === 'all') {
        filterItems = allData; // Show all items when 'all' is selected
    } else {
        filterItems = allData.filter(item => item.type === selectedCategory); // Filter by category
    }
    displayCard(); // Display the filtered cards
}

function displayCard() {
    let selectItem = [];
    let start = currentIndex * cardShow;
    let end = start + cardShow;

    if (currentPage === 'index.html' || currentPage === "") {
        selectItem = filterItems.slice(start, end);
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = end >= filterItems.length;
    } else if (currentPage === 'menu.html') {
        selectItem = filterItems.sort(() => Math.random() - 0.5);  // Display all items in menu
    }

    let element = selectItem.map(function(item) {
        return `<div class="card" data-id="${item.id}">
                    <div class="addCart">
                        <button class="btn addtocart">+</button>
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

    // add cart in cart section function 
    cardContainer.addEventListener("click",function(event){
        let clickCard = event.target;
        console.log("click",clickCard);
        if (clickCard.classList.contains('addtocart')) {
            let itemCard = clickCard.closest('.card');
            let itemId = itemCard.getAttribute('data-id');
            console.log('This item added:', itemId);
        }

        
    })
}

// Add event listeners for prev/next buttons if on index.html
if (currentPage === 'index.html' || currentPage === "") {
    prevBtn.addEventListener("click", function() {
        if (currentIndex > 0) {
            currentIndex--;
            displayCard();
        }
    });
    nextBtn.addEventListener("click", function() {
        if ((currentIndex + 1) * cardShow < filterItems.length) {
            currentIndex++;
            displayCard();
        }
    });
}

loadData();
