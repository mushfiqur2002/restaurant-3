import { filterAndDisplayItems } from './foodCard.js';  // Import filterAndDisplayItems
import { currentPage } from './script.js';  

let categoryCon = document.querySelector('.boxContainer');
let arrData;

export async function fetchData() {
    try {
        const res = await fetch('data.json');
        const datas = await res.json();
        filterCategory(datas);
        return datas;
    } catch (err) {
        console.log(err);
    }
}

// Filter category
function filterCategory(data) {
    let types = data.reduce((acc, item) => {
        
        let existingCategory = acc.find(category => category.type === item.type);
        if (existingCategory) {
            existingCategory.count += 1;  // Increment the count of items in that category
        } else {
            acc.push({ type: item.type, count: 1, svg: item.svgIcon });
        }
        return acc;
    }, []);

    // Add "All" item only for menu.html
    if (currentPage === 'menu.html') {
        let allItem = {
            type: "all",
            count: data.length,  // total number of items
            svg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80 240-320l57-57 183 183 183-183 57 57L480-80ZM298-584l-58-56 240-240 240 240-58 56-182-182-182 182Z"/></svg>`
        };
        types.unshift(allItem);
    }

    displayCategory(types);
}

// Show category cards
function displayCategory(items) {
    let selectItem = items;

    // On the index.html page, display only the first 4 categories
    if (currentPage === 'index.html' || currentPage === "") {
        selectItem = items.slice(0, 4);
    }

    let element = selectItem.map(function(item) {
        return `<div class="card category-card" data-type="${item.type}">
                    <div class="image center">
                        ${item.svg}
                    </div>
                    <div class="info center" style="flex-direction: column;">
                        <p>${item.type}</p>
                        <p>(<strong style="color:#A02334;font-weight: bolder">${item.count}</strong> dishes)</p>
                    </div>
                </div>`;
    }).join('');

    // Inject the generated HTML into the DOM
    categoryCon.innerHTML = element;

    // Attach click event listeners after displaying categories
    addCategoryClickEvents();
}

// Handle category click events
function addCategoryClickEvents() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const selectedCategory = card.getAttribute('data-type');
            filterAndDisplayItems(selectedCategory); // Pass the selected category to filter function
        });
    });
}

fetchData();
