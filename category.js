let categoryCon = document.querySelector('.boxContainer');
let currentPage = window.location.pathname.split("/").pop();
let arrData;

async function fetchData() {
    try {
        const res = await fetch('data.json');
        export const datas = await res.json();
        fliterCategory(datas)

    } catch (err) {
        console.log(err);
    }
}
// fliter category
function fliterCategory(data){
    let types = data.reduce((acc, item) => {
        let existingCategory = acc.find(category => category.type === item.type);
        if (existingCategory) {
            existingCategory.count += 1;  // Increment the count of items in that category
        } else {
            acc.push({ type: item.type, count: 1, svg: item.svgIcon });
        }
        return acc;
    }, []);
    displayCategory(types)
}

// show card 
function displayCategory(items) {
    let selectItem = items;
    if(currentPage === 'index.html' || currentPage ===""){
        selectItem = items.slice(0,4);
    }
    let element = selectItem.map(function(item){
        return `<div class="card">
                    <div class="image center">
                        ${item.svg}
                    </div>
                    <div class="info center" style="flex-direction: column;">
                        <p>${item.type}</p>
                        <p>(<strong style="color:#A02334;font-weight: bolder">${item.count}</strong> dishes)</p>
                    </div>
                </div>`
    }).join('')
    categoryCon.innerHTML = element;
}

// Fetch data and populate categoryArr
fetchData();
