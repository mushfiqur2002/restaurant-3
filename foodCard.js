import { fetchData, currentPage } from './category.js';

const cardContainer = document.querySelector(".cardsContainer .cards");
const prevBtn = document.querySelector(".navigation #prevBtn");
const nextBtn = document.querySelector(".navigation #nextBtn");
let filterItems = [];
let currentIndex = 0;
let cardShow = 4;
let screenSize = window.innerWidth;

if(screenSize<950){
    cardShow = 3;
}
if(screenSize<900){
    cardShow = 2;
}

async function loadData() {
    const data = await fetchData(); // Await the fetchData call 
    // Check if current page is 'index.html' or ""
    if (currentPage === 'index.html' || currentPage === "") {
        // Filter data to only those with a star rating above 4.5
        filterItems = data.filter(item => item.star > 4.5);
    }
    displayCard();
}

function displayCard() {
    let selectItem =[];
    let star = currentIndex * cardShow;
    let end = star + cardShow;
    if (currentPage === 'index.html' || currentPage === ""){
        selectItem = filterItems.slice(star,end);
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

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = end> filterItems.length;
}

prevBtn.addEventListener("click",function(){
    if (currentIndex > 0) {
        currentIndex--;
        displayCard();
    }
})
nextBtn.addEventListener("click",function(){
    if ((currentIndex + 1) * cardShow < filterItems.length) {
        currentIndex++;
        displayCard();
    }
})

loadData();



