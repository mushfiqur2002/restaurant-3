export let currentPage = window.location.pathname.split("/").pop();
const menuBtn = document.querySelector("#openBtn");
const closeBtn = document.querySelector("#closeBtn");
const closeCartBtn = document.querySelector(".cartCloseBtn");
const linksContainer = document.querySelector("#linksCon");
const cartContainer = document.querySelector(".cart");
const addCartBtn = document.querySelector(".addCartButton .btn"); 
const notification = document.querySelector(".notification"); 

menuBtn.addEventListener('click',function(){
    linksContainer.classList.toggle("active");
})
closeBtn.addEventListener('click',function(){
    linksContainer.classList.toggle("active");
})
addCartBtn.addEventListener('click',function(){
    cartContainer.classList.toggle("active");
})
closeCartBtn.addEventListener('click',function(){
    cartContainer.classList.toggle("active");
})