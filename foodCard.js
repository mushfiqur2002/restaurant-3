import { fetchData } from './category.js';
// const fetchData = require('./category.js'); // Import the fetchData function

async function loadData() {
    const data = await fetchData(); // Await the fetchData call
    console.log(data); // Use the fetched data
}

loadData();