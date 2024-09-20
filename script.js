const menuBtn = document.querySelector("#openBtn");
const closeBtn = document.querySelector("#closeBtn");
const linksContainer = document.querySelector("#linksCon"); 

menuBtn.addEventListener('click',function(){
    linksContainer.classList.toggle("active");
})
closeBtn.addEventListener('click',function(){
    linksContainer.classList.toggle("active");
})